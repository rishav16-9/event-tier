import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  title: string | null;
  description: string | null;
  date: string | null;
  image: string | null;
  tier: string | null;
}
export const TierData = ({ title, description, date, image, tier }: Props) => {
  const tierColorMap = {
    free: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
    silver: "bg-blue-500/20 text-blue-800 border-blue-800/5",
    gold: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
    platinum: "bg-rose-500/20 text-rose-800 border-rose-800/5",
  };

  const dateee = (date: string) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={image || ""}
          alt={title || ""}
          fill
          className="object-cover border-b"
        />
      </div>
      <div
        className={cn(
          "flex flex-col p-4 h-full",
          tierColorMap[tier as keyof typeof tierColorMap]
        )}
      >
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-sm">{dateee(date || "")}</p>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};
