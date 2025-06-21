import { useState, useCallback } from "react";
import { useStartSurveyQuery } from "@/store/api";
import { useEvaluate } from "./useEvaluate";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

export const useChatMessages = () => {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const uid = "mock"; //TODO:uidを振るようにする
  const { data: surveyData, isLoading: isInitialLoading } = useStartSurveyQuery({
    uid,
  });

  const initialMessage: Message[] =
    surveyData?.success && surveyData.opening_message
      ? [
          {
            id: "initial",
            content: surveyData.opening_message,
            role: "assistant" as const,
          },
        ]
      : [];

  const allMessages = [...initialMessage, ...userMessages];

  const addMessages = useCallback((messages: Message[]) => {
    setUserMessages((prev) => [...prev, ...messages]);
  }, []);

  const { isEvaluating } = useEvaluate(uid, allMessages);

  return {
    messages: allMessages,
    addMessages,
    isInitialLoading,
    isEvaluating,
  };
};
