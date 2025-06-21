import React from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';

interface MessageInputProps {
    inputValue: string;
    onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSendMessage: () => void;
    isLoading: boolean;
    isInitialLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
    inputValue,
    onInputChange,
    onSendMessage,
    isLoading,
    isInitialLoading
}) => {
    return (
        <Box paddingX={3} marginBottom={3}>
            <Box position="relative" width="100%">
                <Textarea
                    placeholder="メッセージを入力"
                    borderRadius="lg"
                    value={inputValue}
                    onChange={onInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.shiftKey && !isLoading) {
                            e.preventDefault();
                            onSendMessage();
                        }
                    }}
                    disabled={isLoading || isInitialLoading}
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
                    onClick={onSendMessage}
                    disabled={isLoading || isInitialLoading}
                    borderRadius="lg"
                    minW="auto"
                    h="auto"
                >
                    <MdSend size={20} color="#000000" />
                </Button>
            </Box>
        </Box>
    );
};

export default MessageInput;