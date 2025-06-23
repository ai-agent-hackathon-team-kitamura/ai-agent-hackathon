import { useState, useCallback, useRef, useEffect } from "react";
import { useStartSurveyQuery, useEvaluateQuery } from "@/store/api";
import { useEvaluate } from "./useEvaluate";
import { useMessageSender } from "./useMessageSender";
import { useRouter } from "next/navigation";

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

  // 通常の閾値ベースの評価
  const { isEvaluating } = useEvaluate(uid, allMessages);

  // チャット自然完了時の評価用
  const router = useRouter();
  const [completionEvaluate, setCompletionEvaluate] = useState(false);
  const completionEvaluateRef = useRef(false);

  // チャット完了時の評価用クエリ
  const { data: completionEvaluateData, isFetching: isCompletionEvaluating } = useEvaluateQuery(
    { uid, messages: allMessages },
    { skip: !completionEvaluate }
  );

  // チャット完了時の評価が成功した場合の処理
  useEffect(() => {
    if (completionEvaluate && completionEvaluateData?.success) {
      completionEvaluateRef.current = false;
      setCompletionEvaluate(false);
      router.push("/dashboard/report");
    }
  }, [completionEvaluate, completionEvaluateData, router]);

  // チャット完了時に評価を行うコールバック
  const handleChatCompleted = useCallback(() => {
    console.log("Chat naturally completed, evaluating regardless of message threshold");
    if (!completionEvaluateRef.current) {
      completionEvaluateRef.current = true;
      setCompletionEvaluate(true);
    }
  }, []);

  const { handleSendMessage, isLoading, error, isError } = useMessageSender(
    allMessages,
    addMessages,
    uid,
    handleChatCompleted
  );

  return {
    messages: allMessages,
    addMessages,
    isInitialLoading,
    isEvaluating: isEvaluating || isCompletionEvaluating,
    handleSendMessage,
    isLoading,
    error,
    isError,
  };
};
