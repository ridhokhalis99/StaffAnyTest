import { Server } from '@hapi/hapi';
import * as shiftController from './shiftController';
import { createShiftDto, filterSchema, idDto, updateShiftDto } from '../../../shared/dtos';

export default function (server: Server, basePath: string) {
  server.route({
    method: "GET",
    path: basePath,
    handler: shiftController.find,
    options: {
      description: 'Get shifts with filter',
      notes: 'Get all shifts if filter is not specified.',
      tags: ['api', 'shift']
    }
  });
  
  server.route({
    method: "GET",
    path: basePath + "/{id}",
    handler: shiftController.findById,
    options: {
      description: 'Get shift by id',
      notes: 'Get shift by id',
      tags: ['api', 'shift'],
      validate: {
        params: idDto
      },
    }
  });
  
  server.route({
    method: "POST",
    path: basePath,
    handler: shiftController.create,
    options: {
      description: 'Create shift',
      notes: 'Create shift',
      tags: ['api', 'shift'],
      validate: {
        payload: createShiftDto
      },
    }
  });
  
  server.route({
    method: "PATCH",
    path: basePath + "/{id}",
    handler: shiftController.updateById,
    options: {
      description: 'Update shift',
      notes: 'Update shift',
      tags: ['api', 'shift'],
      validate: {
        params: idDto,
        payload: updateShiftDto
      },
    }
  });

  server.route({
    method: "DELETE",
    path: basePath + "/{id}",
    handler: shiftController.deleteById,
    options: {
      description: 'Delete shift',
      notes: 'Delete shift',
      tags: ['api', 'shift'],
      validate: {
        params: idDto,
      },
    }
  });
}