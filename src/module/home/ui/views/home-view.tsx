"use client";
import { useUser } from "@clerk/nextjs";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { TierData } from "../components/tier-data";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

const tiers = ["free", "silver", "gold", "platinum"] as const;
type Tier = (typeof tiers)[number];

export const HomeView = () => {
  const trpc = useTRPC();

  const { user } = useUser();

  const queryClient = useQueryClient();

  const { data, isLoading } = useSuspenseQuery(
    trpc.event.getMany.queryOptions()
  );

  const updateTier = useMutation(
    trpc.event.updateTier.mutationOptions({
      onSuccess: async () => {
        queryClient.invalidateQueries(trpc.event.getMany.queryOptions());
        if (user) {
          await user?.reload();
        }
        toast.success("Event upgraded");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  if (!user) return null;

  // const currentTier = user.publicMetadata?.tier as string;
  const currentTier = user.publicMetadata?.tier as Tier;

  // get the higher tier
  const updradeOption = tiers.slice(tiers.indexOf(currentTier) + 1);

  const disable = isLoading || updateTier.isPending;
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-6 py-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-2xl font-semibold">Welcome to the Event</h1>
          <p className="text-sm text-muted-foreground">
            {`Event based on your ${currentTier} tier`}
          </p>
        </div>
        <div className="flex flex-col gap-y-1">
          {currentTier !== "platinum" && (
            <span className="text-sm">Want to Updrade?</span>
          )}
          <div className="flex gap-2">
            {updradeOption.length > 0 ? (
              updradeOption.map((tier) => (
                <Button
                  key={tier}
                  size="sm"
                  variant="outline"
                  disabled={disable}
                  onClick={() => updateTier.mutate({ tier })}
                >
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </Button>
              ))
            ) : (
              <p className="text-lg font-semibold">
                You are at highest tier 🎉🎉
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-4">
        {data.map((event) => (
          <TierData
            key={event.id}
            title={event?.title}
            description={event?.description}
            image={event?.image_url}
            date={event?.event_date}
            tier={currentTier}
          />
        ))}
      </div>
    </div>
  );
};
