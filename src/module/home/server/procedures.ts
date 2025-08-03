import { client } from "@/lib/client";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { EventTier } from "../type";
import { z } from "zod";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const eventsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const user = await currentUser();
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated",
      });
    }

    const userTier = (user?.publicMetadata?.tier as EventTier) || "free";
    await delay(5000);

    const { data: events } = await client
      .from("events")
      .select()
      .eq("tier", userTier);

    if (!events) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No events for now" });
    }

    return events;
  }),
  updateTier: protectedProcedure
    .input(z.object({ tier: z.enum(["free", "silver", "gold", "platinum"]) }))
    .mutation(async ({ input, ctx }) => {
      const clerk = await clerkClient();

      await clerk.users.updateUser(ctx.auth.userId, {
        publicMetadata: { tier: input.tier },
      });
      return { success: true };
    }),
});
