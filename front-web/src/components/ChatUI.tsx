'use client';

import React, { useState, useCallback } from 'react';
import { Flex } from '@chakra-ui/react';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useMessageSender } from '@/hooks/useMessageSender';
import { useAutoResizeTextarea } from '@/hooks/useAutoResizeTextarea';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import ScrollableMessageList from './chat/ScrollableMessageList';
import MessageInput from './chat/MessageInput';
import ErrorDisplay from './chat/ErrorDisplay';

const ChatUI: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const { messages, addMessages, isInitialLoading } = useChatMessages();
    const { scrollRef: messagesEndRef } = useAutoScroll(messages);
    
    const { handleSendMessage: sendMessage, isLoading, error, isError } = useMessageSender(
        messages,
        addMessages
    );
    const { handleTextareaChange } = useAutoResizeTextarea();

    const handleSendMessageClick = useCallback(async () => {
        if (!inputValue.trim() || isLoading || isInitialLoading) return;
        
        const success = await sendMessage(inputValue);
        if (success) {
            setInputValue('');
        }
    }, [inputValue, isLoading, isInitialLoading, sendMessage]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleTextareaChange(e, setInputValue);
    }, [handleTextareaChange]);

    return (
        <Flex direction="column" height="calc(100vh - 150px)" justify="space-between">
            <ScrollableMessageList
                messages={messages}
                isInitialLoading={isInitialLoading}
                messagesEndRef={messagesEndRef}
            />
            <ErrorDisplay isError={isError} error={error} />
            <MessageInput
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onSendMessage={handleSendMessageClick}
                isLoading={isLoading}
                isInitialLoading={isInitialLoading}
            />
        </Flex>
    );
};

export default ChatUI;
