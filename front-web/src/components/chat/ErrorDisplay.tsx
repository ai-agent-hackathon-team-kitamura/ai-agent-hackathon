import React from 'react';
import { Box, Alert } from '@chakra-ui/react';

interface ErrorDisplayProps {
    isError: boolean;
    error: unknown;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ isError, error }) => {
    if (!isError || !error) return null;

    return (
        <Box paddingX={3} marginBottom={2}>
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Description>
                        {typeof error === 'object' && error !== null && 'data' in error && (error as {data?: unknown}).data
                            ? (typeof (error as {data: unknown}).data === 'string' ? (error as {data: string}).data : 'メッセージの送信に失敗しました')
                            : 'メッセージの送信に失敗しました。もう一度お試しください。'
                        }
                    </Alert.Description>
                </Alert.Content>
            </Alert.Root>
        </Box>
    );
};

export default ErrorDisplay;