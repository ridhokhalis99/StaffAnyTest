import {
  getRepository,
  FindManyOptions,
  FindOneOptions,
  FindConditions,
  DeleteResult,
  Between,
  MoreThan,
  LessThan,
  MoreThanOrEqual,
  LessThanOrEqual,
} from "typeorm";
import moduleLogger from "../../../shared/functions/logger";
import Shift from "../entity/shift";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

const logger = moduleLogger("shiftRepository");

export const find = async (opts?: FindManyOptions<Shift>): Promise<Shift[]> => {
  logger.info("Find");
  const repository = getRepository(Shift);
  const { where, order } = opts;
  const startDate = where[0];
  const endDate = where[1];
  console.log(startDate, endDate);
  const data = await repository.find({
    where: {
      date: Between(startDate, endDate),
    },
    order,
  });
  return data;
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Shift>
): Promise<Shift> => {
  logger.info("Find by id");
  const repository = getRepository(Shift);
  const data = await repository.findOne(id, opts);
  return data;
};

export const findOne = async (
  where?: FindConditions<Shift>,
  opts?: FindOneOptions<Shift>
): Promise<Shift> => {
  logger.info("Find one");
  const repository = getRepository(Shift);
  const data = await repository.findOne(where, opts);
  return data;
};

export const create = async (payload: Shift): Promise<Shift> => {
  logger.info("Create");
  const repository = getRepository(Shift);
  let { date, startTime, endTime } = payload;
  const data = await repository.find({
    where: [
      {
        startTime: Between(startTime, endTime),
        endTime: Between(startTime, endTime),
        date,
      },
      {
        endTime: Between(startTime, endTime),
        date,
      },
      {
        startTime: LessThanOrEqual(startTime),
        endTime: MoreThanOrEqual(endTime),
        date,
      },
    ],
  });
  console.log(data);
  if (data.length) {
    return;
  }
  const newdata = await repository.save(payload);
  return newdata;
};

export const updateById = async (
  id: string,
  payload: QueryDeepPartialEntity<Shift>
): Promise<Shift> => {
  logger.info("Update by id");
  const repository = getRepository(Shift);
  const { date, startTime, endTime } = payload;
  const data = await repository.find({
    where: [
      {
        startTime: Between(startTime, endTime),
        endTime: Between(startTime, endTime),
        date,
      },
      {
        endTime: Between(startTime, endTime),
        date,
      },
      {
        startTime: LessThanOrEqual(startTime),
        endTime: MoreThanOrEqual(endTime),
        date,
      },
    ],
  });
  if (data.length) {
    return;
  }
  await repository.update(id, payload);
  return findById(id);
};

export const deleteById = async (
  id: string | string[]
): Promise<DeleteResult> => {
  logger.info("Delete by id");
  const repository = getRepository(Shift);
  return await repository.delete(id);
};
