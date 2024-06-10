"use client";

import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";

import useAIChatServer from "@/hooks/getAIChatServer.tsx/useGPTChatServer";

export function GPT4oPasswordAccordion({ onToggle }: any) {
  const [close, setClose] = useState(0);
  const firstTouch = true;

  const { isPending } = useAIChatServer(firstTouch);

  useEffect(() => {
    onToggle(close === 1);
  }, [close, onToggle]);

  return (
    <Accordion type="single" collapsible className="min-w-[660px] shadow-sm shadow-red-500">
      <AccordionItem value="item-1">
        <div className="bg-black border border-red-600 rounded-md overflow-hidden ">
          <div className="flex flex-col ">
            <AccordionTrigger
              disabled={isPending}
              onClick={() => {
                if (close) {
                  setClose(0);
                } else {
                  setClose(1);
                }
              }}
              className="px-6 border-b border-red-500"
            >
              <ChatHeader comment="Click here & Chat with Nanobytes AI" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col text-black ">
                <ChatMessages className="px-2 py-3 flex-1" />
                <ChatInput className="px-4" isPendingParent={isPending} subject="basic_chat" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
