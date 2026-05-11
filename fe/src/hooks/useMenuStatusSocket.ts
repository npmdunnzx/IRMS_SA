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
		if (!token) {
			disconnectWebSocket();
			return;
		}

		connectWebSocket(token, (message) => {
			setLastUpdate(message as MenuItemStatusMessage);
		});

		return () => {
			disconnectWebSocket();
		};
	}, [token]);

	return lastUpdate;
};