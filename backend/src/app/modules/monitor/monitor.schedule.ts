/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import prisma from '../../../lib/prisma';
import { scheduleJob } from 'node-schedule';
import { EMonitorStatus } from '@prisma/client';
import { userAgentHeader } from '../../../lib/headers';

const updateMonitorScheduler = () => {
  scheduleJob('*/3 * * * *', async () => {
    const monitors = await prisma.monitor.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (monitors.length === 0) {
      console.log('No monitors found!');
      return;
    }

    let monitorIndex: number = 0;

    const intervalId = setInterval(async () => {
      if (monitorIndex >= monitors.length) {
        clearInterval(intervalId);

        console.log('Finished updation all monitors');

        return;
      }

      const monitor = monitors[monitorIndex];

      try {
        const url = await axios.get(monitor.url, {
          headers: { 'User-Agent': userAgentHeader },
        });

        if (url.status === 200 || url.statusText === 'OK') {
          await prisma.monitor.update({
            where: { url: monitor.url },
            data: { status: EMonitorStatus.UP, statusCode: url.status },
          });
        }

        console.log('Schedule job working.');
      } catch (error: any) {
        console.error('The Error From Monitor Schedule Job ->', error);

        if (error) {
          await prisma.monitor.update({
            where: { id: monitor.id },
            data: { status: EMonitorStatus.DOWN, statusCode: 500 },
          });
        }
      }

      monitorIndex += 1;
    }, 2000);
  });
};

export const MonitorSchedule = { updateMonitorScheduler };
