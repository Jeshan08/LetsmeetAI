import { useState, useEffect } from "react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import type { Channel as StreamChannel } from "stream-chat";

import {
  useCreateChatClient,
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";

import "stream-chat-react/dist/css/v2/index.css";
import { LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ChatUIProps {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string | undefined;
};

export const ChatUI = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: ChatUIProps) => {
  const trpc = useTRPC();
  const { mutateAsync: generateChatToken } = useMutation(
    trpc.meetings.generateChatToken.mutationOptions(),
  );

   //  Check Tier Status
    const { data: usage } = useSuspenseQuery(
      trpc.premium.getFreeUsage.queryOptions(),
    );
    const isFreeTier = usage !== null;

  const router = useRouter();
  const [channel, setChannel] = useState<StreamChannel>();
  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
    tokenOrProvider: generateChatToken,
    userData: {
      id: userId,
      name: userName,
      image: userImage,
    },
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", meetingId, {
      members: [userId],
    });

    setChannel(channel);
  }, [client, meetingId, meetingName, userId]);

  if (!client) {
    return (
      <LoadingState
        title="Loading Chat"
        description="This may take a few seconds"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <Chat client={client}>
        <Channel channel={channel}
          
        >
          <Window>
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b">
              <MessageList />
            </div>
            {!isFreeTier ? (
              <MessageInput />
            ) : (
              <div className="p-4 bg-slate-50/50 border-t flex flex-col items-center gap-y-3">
                <div className="flex items-center gap-x-2 text-slate-500">
                  <LockIcon className="h-3.5 w-3.5" />
                  <p className="text-xs font-medium italic">
                    Interactive chat is a Pro feature
                  </p>
                </div>
                <Button
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={() => router.push("/upgrade")}
                >
                  Upgrade to Chat
                </Button>
              </div>
            )}
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}