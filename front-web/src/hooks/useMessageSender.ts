import { useCallback } from 'react';
import { useSendMessageMutation } from '@/store/api';
import type { Message } from '@/types/chat';

export const useMessageSender = (
    messages: Message[],
    addMessages: (messages: Message[]) => void,
    reset: () => void
) => {
    const [sendMessage, { isLoading, error, isError }] = useSendMessageMutation();

    const handleSendMessage = useCallback(async (inputValue: string) => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading) return false;

        const userMessage: Message = {
            id: crypto.randomUUID(),
            content: trimmedInput,
            role: 'user'
        };
        addMessages([userMessage]);
        reset();

        const currentMessages = [...messages, userMessage];
        const result = await sendMessage({
            messages: currentMessages.map(msg => ({ role: msg.role, content: msg.content }))
        });

        if ('data' in result && result.data?.success && result.data.generated_text) {
            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                content: result.data.generated_text,
                role: 'assistant'
            };
            addMessages([assistantMessage]);
        }

        return true;
    }, [messages, addMessages, reset, sendMessage, isLoading]);

    return {
        handleSendMessage,
        isLoading,
        error,
        isError
    };
};