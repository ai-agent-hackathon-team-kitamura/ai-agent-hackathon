import React from 'react';
import {
    Box,
    Input,
    Button,
    Flex,
} from '@chakra-ui/react';
import ChatMessage from './ChatMessage';

interface Message {
    content: string;
    role: 'user' | 'bot';
}

const ChatUI: React.FC = () => {
    const messages: Message[] = [
        { content: 'Hello!', role: 'bot' },
        { content: 'Hi there!', role: 'user' },
        { content: 'How can I help you?', role: 'bot' },
    ];

    return (
        <Flex direction="column" height="calc(100vh - 50px)" justify="space-between">
            <Box overflowY="auto">
                {messages.map((message, index) => (
                    <ChatMessage key={index} sender={message.role}>
                        {message.content}
                    </ChatMessage>
                ))}
            </Box>
            <Box paddingX={3} marginBottom={3}>
                <Flex alignItems="center" gap={2} width="100%">
                    <Input placeholder="Type your message..." borderRadius="full" />
                    <Button colorScheme="blue" borderRadius="full">Send</Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default ChatUI;
