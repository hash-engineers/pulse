/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import prisma from '../../../lib/prisma';
import { scheduleJob } from 'node-schedule';
import { userAgentHeader } from '../../../lib/headers';
import { IncidentService } from '../incident/incident.service';
import { EIncidentStatus, EMonitorStatus } from '@prisma/client';
import sendMail from '../../../shared/send-mail';

const updateMonitorScheduler = () => {
  scheduleJob('*/1 * * * *', async () => {
    const monitors = await prisma.monitor.findMany({
      include: { company: { include: { members: true } } },
    });

    if (monitors.length === 0) {
      console.log('No monitors found!');
      return;
    }

    let monitorIndex = 0;

    const processNextMonitor = async () => {
      if (monitorIndex >= monitors.length) {
        console.log('Finished updating all monitors.');
        return;
      }

      const monitor = monitors[monitorIndex];

      try {
        const url = await axios.get(monitor.url, {
          headers: { 'User-Agent': userAgentHeader },
        });

        await prisma.$transaction(async tx => {
          if (url.status === 200 || url.statusText === 'OK') {
            await tx.monitor.update({
              where: { url: monitor.url },
              data: { status: EMonitorStatus.UP, statusCode: url.status },
            });
          }

          console.log('Schedule job working for monitor ->', monitor.url);
        });
      } catch (error: any) {
        console.error(
          'Error From Check Availability With Schedule Job ->',
          monitor.url,
        );

        await prisma.$transaction(async tx => {
          await tx.monitor.update({
            where: { id: monitor.id },
            data: {
              status: EMonitorStatus.DOWN,
              statusCode: error?.response?.status ?? 500,
            },
          });

          console.log(monitor.url, monitor.company.members[0].email);

          const isTheIncidentOngoing = await tx.incident.findFirst({
            where: {
              monitorId: monitor.id,
              code: error.code,
              status: EIncidentStatus.ONGOING,
            },
          });

          if (!isTheIncidentOngoing) {
            await IncidentService.createAnIncident(tx, {
              code: error.code,
              statusCode: error?.response?.status,
              statusMessage: error?.response?.statusText,
              monitorId: monitor.id,
            });

            sendMail({
              to: monitor.company.members[0].email,
              subject: 'An incident occurred to your monitor.',
              body: `<h2>Incident occurred with status ${error.code}</h2>`,
            });
          }
        });
      }

      monitorIndex += 1;

      setTimeout(processNextMonitor, 500);
    };

    processNextMonitor();
  });
};

export const MonitorSchedule = { updateMonitorScheduler };
