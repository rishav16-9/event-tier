import { AppRouter } from "@/trpc/routers/_app"
import { inferRouterOutputs } from "@trpc/server"
export type EventTier = "free" | "silver" | "gold" | "platinum"

export type EventsGetMany = inferRouterOutputs<AppRouter>["event"]["getMany"]
