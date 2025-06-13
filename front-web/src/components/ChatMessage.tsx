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
        <Flex justify={sender === 'user' ? 'flex-end' : 'flex-start'}>
            <Box
                p={3}
                bg={sender === 'user' ? 'blue.500' : 'transparent'}
                color={sender === 'user' ? 'white' : 'black'}
                maxWidth={sender === 'user' ? "50%" : "90%"}
                borderRadius={sender === 'user' ? "xl" : undefined}
            >
                <Text>{children}</Text>
            </Box>
        </Flex>
    );
};

export default ChatMessage;
