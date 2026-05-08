import { useEffect, useState } from 'react';
import { connectWebSocket, disconnectWebSocket } from '../services/websocket';

type MenuItemStatusMessage = {
itemId: number;
itemName: string;
status: string;
};

export const useMenuStatusSocket = (token: string | null) => {
const [lastUpdate, setLastUpdate] = useState<MenuItemStatusMessage | null>(null);

useEffect(() => {
connectWebSocket(token, (message) => {
setLastUpdate(message as MenuItemStatusMessage);
});

}, [token]);

return lastUpdate;
};