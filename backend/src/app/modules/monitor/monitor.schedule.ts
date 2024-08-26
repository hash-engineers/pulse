/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import prisma from '../../../lib/prisma';
import { scheduleJob } from 'node-schedule';
import { EMonitorStatus } from '@prisma/client';
import { userAgentHeader } from '../../../lib/headers';

const updateMonitorScheduler = () => {
  scheduleJob('*/1 * * * *', async () => {
    const monitors = await prisma.monitor.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (monitors.length === 0) {
      console.log('No monitors found!');
      return;
    }

    try {
      const url = await axios.get(monitors[0].url, {
        headers: { 'User-Agent': userAgentHeader },
      });

      if (url.status === 200 || url.statusText === 'OK') {
        await prisma.monitor.update({
          where: { url: monitors[0].url },
          data: { status: EMonitorStatus.UP, statusCode: url.status },
        });
      }

      console.log('Schedule job working.');
    } catch (error: any) {
      console.error('The Error From Monitor Schedule Job ->', error);

      if (error) {
        await prisma.monitor.update({
          where: { id: monitors[0].id },
          data: { status: EMonitorStatus.DOWN, statusCode: 500 },
        });
      }
    }
  });
};

export const MonitorSchedule = { updateMonitorScheduler };
