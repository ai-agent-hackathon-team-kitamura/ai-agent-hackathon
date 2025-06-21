import { useState, useCallback } from 'react';
import { useStartSurveyQuery } from '@/store/api';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
}

export const useChatMessages = () => {
    const [userMessages, setUserMessages] = useState<Message[]>([]);
    
    const { data: surveyData, isLoading: isInitialLoading } = useStartSurveyQuery({
        health: {
            score: 3,
            note: "標準的な健康状態"
        },
        createdAt: new Date().toISOString().slice(0, 10).replace(/-/g, '')
    });

    const initialMessage: Message[] = surveyData?.success && surveyData.opening_message 
        ? [{
            id: 'initial',
            content: surveyData.opening_message,
            role: 'assistant' as const
        }]
        : [];

    const allMessages = [...initialMessage, ...userMessages];

    const addMessages = useCallback((messages: Message[]) => {
        setUserMessages(prev => [...prev, ...messages]);
    }, []);

    return {
        messages: allMessages,
        addMessages,
        isInitialLoading
    };
};