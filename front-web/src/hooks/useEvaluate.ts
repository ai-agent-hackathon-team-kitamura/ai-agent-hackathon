import { useEffect, useState } from "react";
import { useEvaluateQuery, ChatMessage } from "@/store/api";
import { useRouter } from "next/navigation";

// チャット件数の閾値を超えたら /evaluate を呼び出し、成功後に /dashboard/report へリダイレクトするフック
export const useEvaluate = (uid: string, messages: ChatMessage[], threshold: number = 21) => {
  const router = useRouter();
  const [hasTriggered, setHasTriggered] = useState(false);

  // 未実行かつメッセージ件数がしきい値を超えたら API を叩く
  const shouldFetch = !hasTriggered && messages.length > threshold;

  const {
    data,
    isFetching: isEvaluating,
    isError,
    error,
  } = useEvaluateQuery({ uid, messages }, { skip: !shouldFetch });

  // 成功したら一度だけリダイレクト
  useEffect(() => {
    if (data?.success) {
      setHasTriggered(true);
      router.push("/dashboard/report");
    }
  }, [data, router]);

  return { data, isEvaluating, isError, error };
};
