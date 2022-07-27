import {
  getRepository,
  FindManyOptions,
  FindOneOptions,
  FindConditions,
  DeleteResult,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
  Raw,
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

export const create = async (payload: any): Promise<Shift> => {
  logger.info("Create");
  const repository = getRepository(Shift);
  let { date, startTime, endTime } = payload;
  const first = date.getDate() - date.getDay() + 1;
  const last = first + 6;
  const monday = new Date(date.setDate(first));
  const sunday = new Date(date.setDate(last));
  const publishChecker = await repository.find({
    where: {
      date: Between(monday, sunday),
    },
  });
  if (publishChecker.length) {
    if (publishChecker[0].isPublished) {
      return;
    }
  }
  const clashChecker = await repository.find({
    where: [
      {
        startTime: Between(startTime, endTime),
        endTime: Between(startTime, endTime),
        date,
      },
      {
        endTime: Raw(
          (alias) => `${alias} > '${startTime}' AND ${alias} < '${endTime}'`
        ),
        date,
      },
      {
        startTime: LessThanOrEqual(startTime),
        endTime: MoreThanOrEqual(endTime),
        date,
      },
    ],
  });
  if (clashChecker.length) {
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
  const clashChecker = await repository.find({
    where: [
      {
        startTime: Between(startTime, endTime),
        endTime: Between(startTime, endTime),
        date,
      },
      {
        endTime: Raw(
          (alias) => `${alias} > '${startTime}' AND ${alias} < '${endTime}'`
        ),
        date,
      },
      {
        startTime: LessThanOrEqual(startTime),
        endTime: MoreThanOrEqual(endTime),
        date,
      },
    ],
  });
  if (clashChecker.length) {
    return;
  }
  const shift = await repository.findOne({
    id,
  });
  if (shift.isPublished) {
    return;
  }
  await repository.update(id, payload);
  return findById(id);
};

export const deleteById = async (id: any): Promise<DeleteResult> => {
  logger.info("Delete by id");
  const repository = getRepository(Shift);
  const shift = await repository.findOne({
    id,
  });
  if (shift.isPublished) {
    return;
  }
  return await repository.delete(id);
};

export const publishShift = async (
  opts?: FindManyOptions<Shift>
): Promise<Shift[]> => {
  logger.info("Publish");
  const repository = getRepository(Shift);
  const { where } = opts;
  const startDate = where[0];
  const endDate = where[1];
  await repository
    .createQueryBuilder()
    .update({
      isPublished: true,
    })
    .where({
      date: Between(startDate, endDate),
    })
    .execute();
  return find(opts);
};
