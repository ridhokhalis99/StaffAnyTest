import { Server } from '@hapi/hapi';
import createV1Routes from "./v1";

export default function (server: Server, basePath: string) {
  createV1Routes(server, basePath + "/v1")
};