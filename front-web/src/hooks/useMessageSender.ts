import { useCallback } from "react";
import { useSendMessageMutation } from "@/store/api";
import type { Message } from "@/types/chat";

export const useMessageSender = (
  messages: Message[],
  addMessages: (messages: Message[]) => void,
  uid: string,
  onCompleted?: (uid: string, messages: Message[]) => void
) => {
  const [sendMessage, { isLoading, error, isError, reset }] = useSendMessageMutation();

  const handleSendMessage = useCallback(
    async (inputValue: string) => {
      const trimmedInput = inputValue.trim();
      if (!trimmedInput || isLoading) return false;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        content: trimmedInput,
        role: "user",
      };
      addMessages([userMessage]);
      reset();

      const currentMessages = [...messages, userMessage];
      const result = await sendMessage({
        messages: currentMessages.map((msg) => ({ role: msg.role, content: msg.content })),
      });
      //   ここで完了判定をし、もし完了してる場合は useEvaluate(uid, allMessages)を叩いて欲しい
      if (result.data?.is_completed && onCompleted) {
        onCompleted(uid, currentMessages);
      }
      if ("data" in result && result.data?.success && result.data.generated_text) {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          content: result.data.generated_text,
          role: "assistant",
        };
        addMessages([assistantMessage]);
      }

      return true;
    },
    [messages, addMessages, reset, sendMessage, isLoading, uid, onCompleted]
  );

  return {
    handleSendMessage,
    isLoading,
    error,
    isError,
  };
};
