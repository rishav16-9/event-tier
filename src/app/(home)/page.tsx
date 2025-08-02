import { client } from "@/lib/client";
import { HomeView } from "@/module/home/ui/views/home-view";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const userTier = (user.unsafeMetadata?.tier as string) || "free";
  const { data: eventss, error } = await client
    .from("events")
    .select("*")
    .eq("tier", userTier);
  console.log(error);
  return (
    <div>
      <HomeView data={eventss} />
    </div>
  );
};

export default Page;
