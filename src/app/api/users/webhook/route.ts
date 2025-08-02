import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    throw new Error("Signing secret missing. Please check your .env file");
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_signature || !svix_timestamp) {
    return new Response("Error missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-signature": svix_signature,
      "svix-timestamp": svix_timestamp,
    }) as WebhookEvent;
  } catch (error) {
    console.log("Error: could not verify webhhok", error);
    return new Response("verification Error", { status: 500 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id: userId } = evt.data;
    try {
      const clerkSecretKey = process.env.CLERK_SECRET_KEY!;
      if (!clerkSecretKey) {
        return new Response("Secret key missing", { status: 400 });
      }
      await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${clerkSecretKey}`, // Backend key
        },
        body: JSON.stringify({
          public_metadata: { tier: "free" },
          unsafe_metadata: {tier: "free"}
        }),
      });
    } catch (error) {
      console.error("Failed to set default tier:", error);
    }
  }

  return new Response("Webhook processed", { status: 200 });
}
