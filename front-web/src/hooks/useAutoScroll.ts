import { useEffect, useRef, useCallback } from 'react';

export const useAutoScroll = <T>(dependency: T) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = useCallback(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [dependency, scrollToBottom]);

    return { scrollRef, scrollToBottom };
};