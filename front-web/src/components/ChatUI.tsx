'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Button,
    Flex,
    Alert,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
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

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        
        // 高さを自動調整
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
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
        <Flex direction="column" height="calc(100vh - 150px)" justify="space-between">
            <Box
                flex="1"
                px={4}
                overflowY="scroll"
                css={{
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#c1c1c1',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#a8a8a8',
                    },
                }}
            >
                <Box
                    minH="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                >
                    {messages.length > 0 && (
                        <Flex alignItems="center" mb={8} width="100%">
                            <Box flex="1" height="2px" bg="#662B1C"></Box>
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color="#662B1C"
                                px={6}
                                whiteSpace="nowrap"
                            >
                                2025年6月エンゲージメントサーベイ
                            </Text>
                            <Box flex="1" height="2px" bg="#662B1C"></Box>
                        </Flex>
                    )}
                    {messages.map((message) => (
                        <ChatMessage key={message.id} sender={message.role === 'user' ? 'user' : 'bot'}>
                            {message.content}
                        </ChatMessage>
                    ))}
                    <div ref={messagesEndRef} />
                </Box>
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
                <Box position="relative" width="100%">
                    <Textarea
                        placeholder="メッセージを入力"
                        borderRadius="lg"
                        value={inputValue}
                        onChange={handleTextareaChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.shiftKey && !isLoading) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        disabled={isLoading}
                        bg="white"
                        border="1px solid"
                        borderColor="gray.300"
                        _focus={{
                            borderColor: "blue.400",
                            boxShadow: "0 0 0 1px #3182ce"
                        }}
                        pr={12}
                        resize="none"
                        rows={1}
                        minH="40px"
                        maxH="120px"
                        overflowY="hidden"
                        lineHeight="24px"
                    />
                    <Button
                        position="absolute"
                        right={2}
                        bottom={2}
                        bg="transparent"
                        _hover={{ bg: "gray.100" }}
                        p={2}
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        borderRadius="lg"
                        minW="auto"
                        h="auto"
                    >
                        <MdSend size={20} color="#000000" />
                    </Button>
                </Box>
            </Box>
        </Flex>
    );
};

export default ChatUI;
