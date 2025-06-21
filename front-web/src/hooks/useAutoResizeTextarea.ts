import { useCallback } from 'react';

export const useAutoResizeTextarea = () => {
    const handleTextareaChange = useCallback((
        e: React.ChangeEvent<HTMLTextAreaElement>,
        onValueChange: (value: string) => void
    ) => {
        onValueChange(e.target.value);
        
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }, []);

    return { handleTextareaChange };
};