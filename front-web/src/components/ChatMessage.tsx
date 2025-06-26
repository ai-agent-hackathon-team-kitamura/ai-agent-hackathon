import React from 'react';
import {
    Box,
    Flex,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { Prose } from '@/components/ui/prose';

interface ChatMessageProps {
    sender: 'user' | 'bot';
    children: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, children }) => {
    return (
        <Flex justify={sender === 'user' ? 'flex-end' : 'flex-start'} mb={4}>
            <Box
                p={4}
                bg={sender === 'user' ? '#FFFAF1' : '#F4F4F4'}
                color="black"
                maxWidth="90%"
                borderRadius="lg"
            >
                <Prose color="inherit" maxWidth="none">
                    <ReactMarkdown>{children}</ReactMarkdown>
                </Prose>
            </Box>
        </Flex>
    );
};

export default ChatMessage;
