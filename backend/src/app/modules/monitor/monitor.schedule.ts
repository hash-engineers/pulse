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
      await axios.get(monitors[0].url, {
        headers: { 'User-Agent': userAgentHeader },
      });

      console.log('Schedule job works new~');
    } catch (error: any) {
      console.error('The Error From Monitor Schedule Job ->', error);

      if (error) {
        await prisma.monitor.update({
          where: { id: monitors[0].id },
          data: { status: EMonitorStatus.DOWN },
        });
      }
    }
  });
};

export const MonitorSchedule = { updateMonitorScheduler };
