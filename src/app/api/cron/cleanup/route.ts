// app/api/cron/cleanup/route.ts
import { db } from "@/db";
import { processedMessages } from "@/db/schema";
import { lt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.delete(processedMessages)
    .where(lt(processedMessages.createdAt, new Date(Date.now() - 60000)));

  return NextResponse.json({ status: "cleaned up" });
}