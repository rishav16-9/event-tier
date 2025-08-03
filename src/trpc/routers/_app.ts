import { eventsRouter } from "@/module/home/server/procedures";
import {  createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
event: eventsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
