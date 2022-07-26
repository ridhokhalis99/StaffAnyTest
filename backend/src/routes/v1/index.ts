import { Server } from "@hapi/hapi";
import createShiftRoutes from "./shifts";

export default function (server: Server, basePath: string) {
  createShiftRoutes(server, basePath + "/shifts");
}
