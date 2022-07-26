import Joi from "joi";

/**
 * How to use: https://typeorm.io/#/find-options
 * Gotchas: https://github.com/glennjones/hapi-swagger/blob/master/usageguide.md#params-query-and-headers
 */
export const filterSchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
  select: Joi.array().items(Joi.string()),
  relations: Joi.array().items(Joi.string()),
  where: Joi.object(),
  order: Joi.object(),
});