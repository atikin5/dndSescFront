import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

interface Props {
    locationId: string;
}
export function StompClient({locationId}: Props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/websocket',
            onConnect: () => {
                client.subscribe(`/topic/${locationId}`, (message) => {
                    setMessages(prev => [...prev, JSON.parse(message.body)]);
                });
            },
        });
        client.activate();

        //return () => client.deactivate();
    }, []);

    return {messages};
};