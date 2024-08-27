import prisma from '../../../lib/prisma';
import { Incident } from '@prisma/client';
import ApiError from '../../../errors/api-error';

const createAnIncident = async (data: Incident): Promise<Incident> => {
  const incident = await prisma.incident.create({ data });

  if (!incident) throw new ApiError(500, 'Failed to create an incident!');

  return incident;
};

export const IncidentService = { createAnIncident };
