"use client";
import { useUser } from "@clerk/nextjs";
import { TierData } from "../components/tier-data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  data: any;
}

const tiers = ["free", "silver", "gold", "platinum"];

export const HomeView = ({ data }: Props) => {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  if (!user) return null;

  // const currentTier = user.publicMetadata?.tier as string;
  const currentTier = user.unsafeMetadata?.tier as string;

  // get the higher tier

  const updradeOption = tiers.slice(tiers.indexOf(currentTier) + 1);

  const handleUpgrade = async (tier: string) => {
    setLoading(true);
    try {
      await user?.update({
        unsafeMetadata: { tier },
      });
      router.refresh();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-6 py-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-2xl font-semibold">Welcome to the Event</h1>
          <p className="text-sm text-muted-foreground">
            {`Event based on your ${user?.unsafeMetadata?.tier} tier`}
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
                  disabled={loading}
                  onClick={() => handleUpgrade(tier)}
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
          />
        ))}
      </div>
    </div>
  );
};
