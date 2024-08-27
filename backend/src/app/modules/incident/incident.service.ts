import { Incident } from '@prisma/client';
import { DB } from '../../../types/prisma';
import ApiError from '../../../errors/api-error';
import { CreateAnIncidentRequest } from './incident.type';

const createAnIncident = async (
  db: DB,
  data: CreateAnIncidentRequest,
): Promise<Incident> => {
  const incident = await db.incident.create({ data });

  if (!incident) throw new ApiError(500, 'Failed to create an incident!');

  return incident;
};

export const IncidentService = { createAnIncident };
