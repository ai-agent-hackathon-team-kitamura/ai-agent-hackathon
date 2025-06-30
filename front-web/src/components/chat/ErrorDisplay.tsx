import React from 'react';
import { Box, Alert } from '@chakra-ui/react';

interface ErrorDisplayProps {
    isError: boolean;
    error: unknown;
}

const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'object' && error && 'data' in error) {
        const data = (error as { data?: unknown }).data;
        if (typeof data === 'string') return data;
    }
    return 'メッセージの送信に失敗しました。もう一度お試しください。';
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ isError, error }) => {
    if (!isError || !error) return null;

    return (
        <Box paddingX={3} marginBottom={2}>
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Description>
                        {getErrorMessage(error)}
                    </Alert.Description>
                </Alert.Content>
            </Alert.Root>
        </Box>
    );
};

export default ErrorDisplay;