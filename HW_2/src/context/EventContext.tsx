import type React from "react";
import { createContext, useCallback, useState } from "react";

export interface EventLogContextValue {
    events: string[];
    addEvent: (message: string) => void;
    clearEvents: () => void;
}

export const EventLogContext = createContext<EventLogContextValue | null>(null);

interface EventLogProviderProps {
    children: React.ReactNode;
}

export const EventLogProdiver: React.FC<EventLogProviderProps> = ({
    children,
}) => {
    const [events, setEvents] = useState<string[]>([]);

    const addEvent = useCallback((message: string) => {
        setEvents((prev) => [
            `${new Date().toLocaleTimeString()} — ${message}`,
            ...prev,
        ]);
    }, []);

    const clearEvents = useCallback(() => {
        setEvents([]);
    }, []);

    const value: EventLogContextValue = {
        events,
        addEvent,
        clearEvents,
    };
    return (
        <EventLogContext.Provider value={value}>
            {children}
        </EventLogContext.Provider>
    );
};
