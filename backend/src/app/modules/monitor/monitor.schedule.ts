/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import env from '../../../env';
import prisma from '../../../lib/prisma';
import { scheduleJob } from 'node-schedule';
import sendMail from '../../../shared/send-mail';
import { userAgentHeader } from '../../../lib/headers';
import { IncidentService } from '../incident/incident.service';
import incidentMail from '../../../email-templates/incident-mail';
import { EIncidentStatus, EMonitorStatus, ERole } from '@prisma/client';

const updateMonitorScheduler = () => {
  scheduleJob('*/3 * * * *', async () => {
    const monitors = await prisma.monitor.findMany({
      include: { company: { include: { members: true } } },
    });

    if (monitors.length === 0) return;

    let monitorIndex = 0;

    const processNextMonitor = async () => {
      if (monitorIndex >= monitors.length) return;

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
        });
      } catch (error: any) {
        await prisma.$transaction(async tx => {
          await tx.monitor.update({
            where: { id: monitor.id },
            data: {
              status: EMonitorStatus.DOWN,
              statusCode: error?.response?.status ?? 500,
            },
          });

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

            const recipient = monitor.company.members.find(
              member => member.role === ERole.SRE,
            );

            if (recipient) {
              await sendMail({
                to: recipient.email,
                subject: 'An incident occurred to your monitor.',
                body: incidentMail({
                  username: recipient.name,
                  monitorUrl: monitor.url,
                  monitorName: monitor.name,
                  incidentDetectedAt: new Date().toISOString(),
                  incidentType: error.code,
                  navigateUrl: `${env.CLIENT_MAIN_URL}/dashboard/monitors/${monitor.id}`,
                }),
              });
            }
          }
        });
      }

      monitorIndex += 1;

      setTimeout(processNextMonitor, 1000);
    };

    processNextMonitor();
  });
};

export const MonitorSchedule = { updateMonitorScheduler };
