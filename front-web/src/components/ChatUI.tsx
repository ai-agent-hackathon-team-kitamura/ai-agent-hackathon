'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Input,
    Button,
    Flex,
    Alert,
} from '@chakra-ui/react';
import ChatMessage from './ChatMessage';
import { useSendMessageMutation } from '@/store/api';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
}

const ChatUI: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [sendMessage, { isLoading, error, isError, reset }] = useSendMessageMutation();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading) return;

        const userMessage: Message = {
            id: crypto.randomUUID(),
            content: trimmedInput,
            role: 'user'
        };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');
        reset();

        const result = await sendMessage({
            messages: newMessages.map(msg => ({ role: msg.role, content: msg.content }))
        });

        if ('data' in result && result.data?.success && result.data.generated_text) {
            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                content: result.data.generated_text,
                role: 'assistant'
            };
            setMessages([...newMessages, assistantMessage]);
        }
    };

    return (
        <Flex direction="column" height="calc(100vh - 50px)" justify="space-between">
            <Box overflowY="auto">
                {messages.map((message) => (
                    <ChatMessage key={message.id} sender={message.role === 'user' ? 'user' : 'bot'}>
                        {message.content}
                    </ChatMessage>
                ))}
                <div ref={messagesEndRef} />
            </Box>
            {isError && error && (
                <Box paddingX={3} marginBottom={2}>
                    <Alert.Root status="error">
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Description>
                                {'data' in error && error.data
                                    ? (typeof error.data === 'string' ? error.data : 'メッセージの送信に失敗しました')
                                    : 'メッセージの送信に失敗しました。もう一度お試しください。'
                                }
                            </Alert.Description>
                        </Alert.Content>
                    </Alert.Root>
                </Box>
            )}
            <Box paddingX={3} marginBottom={3}>
                <Flex alignItems="center" gap={2} width="100%">
                    <Input
                        placeholder="Type your message..."
                        borderRadius="full"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                        disabled={isLoading}
                    />
                    <Button
                        colorScheme="blue"
                        borderRadius="full"
                        onClick={handleSendMessage}
                        disabled={isLoading}
                    >
                        Send
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default ChatUI;
