'use client';

import React, { useState } from 'react';
import {
    Box,
    Input,
    Button,
    Flex,
} from '@chakra-ui/react';
import ChatMessage from './ChatMessage';
import { useSendMessageMutation, ChatMessage as ChatMessageType } from '@/store/api';

interface Message {
    content: string;
    role: 'user' | 'assistant';
}

const ChatUI: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [sendMessage, { isLoading }] = useSendMessageMutation();

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = { content: inputValue, role: 'user' };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');

        try {
            const response = await sendMessage({
                messages: newMessages.map(msg => ({ role: msg.role, content: msg.content }))
            }).unwrap();

            if (response.success && response.generated_text) {
                const assistantMessage: Message = {
                    content: response.generated_text,
                    role: 'assistant'
                };
                setMessages([...newMessages, assistantMessage]);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <Flex direction="column" height="calc(100vh - 50px)" justify="space-between">
            <Box overflowY="auto">
                {messages.map((message, index) => (
                    <ChatMessage key={index} sender={message.role === 'user' ? 'user' : 'bot'}>
                        {message.content}
                    </ChatMessage>
                ))}
            </Box>
            <Box paddingX={3} marginBottom={3}>
                <Flex alignItems="center" gap={2} width="100%">
                    <Input
                        placeholder="Type your message..."
                        borderRadius="full"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                        colorScheme="blue"
                        borderRadius="full"
                        onClick={handleSendMessage}
                        isLoading={isLoading}
                    >
                        Send
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default ChatUI;
