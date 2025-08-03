import { Suspense } from "react";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { currentUser } from "@clerk/nextjs/server";
import { getQueryClient, trpc } from "@/trpc/server";
import { HomeView } from "@/module/home/ui/views/home-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.event.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading ...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <HomeView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
