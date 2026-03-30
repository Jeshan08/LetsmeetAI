import Link from "next/link";
import Image from "next/image";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import {
  CallControls,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  onLeave: () => void;
  meetingName: string;
};

export const CallActive = ({ onLeave, meetingName }: Props) => {

  const trpc = useTRPC();
  const [timeLeft, setTimeLeft] = useState(20);

  // 1. Check for Free Tier
  const { data: usage } = useSuspenseQuery(
    trpc.premium.getFreeUsage.queryOptions(),
  );
  const isFreeTier = usage !== null;

  useEffect(() => {
    if (!isFreeTier) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          
          // Trigger the leave logic which fires your webhook
          onLeave(); 

          toast.error("Trial Limit Reached", {
            description: "20-second trial ended. Generating your AI summary now...",
            duration: 10000,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFreeTier, onLeave]);


  return (
    <div className="flex flex-col justify-between p-4 h-full text-white">
      {/* 3. Visual Timer for free tier*/}
      {isFreeTier && (
        <div className="absolute top-20 right-8 z-50 bg-red-600/90 text-white px-3 py-1 rounded-full text-sm font-mono font-bold animate-pulse">
          Trial: {timeLeft}s
        </div>
      )}
      <div className="bg-[#101213] rounded-full p-4 flex items-center gap-4">
        <Link href="/" className="flex items-center justify-center p-1 bg-white/10 rounded-full w-fit">
          <Image src="/logo.svg" width={22} height={22} alt="Logo" />
        </Link>
        <h4 className="text-base">
          {meetingName}
        </h4>
      </div>
      <SpeakerLayout />
      <div className="bg-[#101213] rounded-full px-4">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};