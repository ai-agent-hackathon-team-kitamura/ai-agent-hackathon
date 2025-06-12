import React from 'react';
import {
    Box,
    Input,
    Button,
    Flex,
} from '@chakra-ui/react';
import ChatMessage from './ChatMessage';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const ChatUI: React.FC = () => {
    const messages: Message[] = [
        { text: 'Hello!', sender: 'bot' },
        { text: 'Hi there!', sender: 'user' },
        { text: 'How can I help you?', sender: 'bot' },
    ];

    return (
        <Flex direction="column" height="calc(100vh - 50px)" justify="space-between">
            <Box overflowY="auto">
                {messages.map((message, index) => (
                    <ChatMessage key={index} sender={message.sender}>
                        {message.text}
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
