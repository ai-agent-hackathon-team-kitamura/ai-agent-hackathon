import React from 'react';
import { Box, Flex, Text, Spinner } from '@chakra-ui/react';
import ChatMessage from '../ChatMessage';
import type { Message } from '@/types/chat';

interface ScrollableMessageListProps {
    messages: Message[];
    isInitialLoading: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const SCROLLBAR_STYLES = {
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
};

const ScrollableMessageList: React.FC<ScrollableMessageListProps> = ({
    messages,
    isInitialLoading,
    messagesEndRef
}) => {
    return (
        <Box
            flex="1"
            px={4}
            overflowY="scroll"
            css={SCROLLBAR_STYLES}
        >
            <Box
                minH="100%"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
            >
                {isInitialLoading ? (
                    <Flex justifyContent="center" alignItems="center" height="200px">
                        <Spinner size="lg" color="blue.500" />
                    </Flex>
                ) : (
                    <>
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
                    </>
                )}
                <div ref={messagesEndRef} />
            </Box>
        </Box>
    );
};

export default ScrollableMessageList;