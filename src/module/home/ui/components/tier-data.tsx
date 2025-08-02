import Image from "next/image";

interface Props {
  title: string;
  description: string;
  date: string;
  image: string;
}
export const TierData = ({ title, description, date, image }: Props) => {
  const dateee = (date: string) => {
    const newDate = new Date(date)
    return newDate.toDateString();
  };

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden">
      <div className="relative aspect-square">
        <Image src={image} alt={title} fill className="object-cover border-b" />
      </div>
      <div className="flex flex-col p-4 bg-red-200 h-full">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-sm">{dateee(date)}</p>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};
