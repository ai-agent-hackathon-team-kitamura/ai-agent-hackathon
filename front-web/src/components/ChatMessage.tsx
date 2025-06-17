import React from 'react';
import {
    Box,
    Text,
    Flex,
} from '@chakra-ui/react';

interface ChatMessageProps {
    sender: 'user' | 'bot';
    children: React.ReactNode;
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
                <Text>{children}</Text>
            </Box>
        </Flex>
    );
};

export default ChatMessage;
