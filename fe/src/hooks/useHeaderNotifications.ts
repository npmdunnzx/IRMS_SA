import { useEffect, useMemo, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export type HeaderNotification = {
  id: string;
  title: string;
  message: string;
  topic: "menu-item-status" | "option-choice-status";
  createdAt: number;
};

type MenuItemStatusMessage = {
  itemId: number;
  itemName: string;
  status: string;
};

type OptionChoiceStatusMessage = {
  optionChoiceId: number;
  optionChoiceName: string;
  status: string;
};

const PRIVILEGED_ROLES = new Set(["ADMIN", "MANAGER"]);

function getStoredToken(): string | null {
  return localStorage.getItem("accessToken") || localStorage.getItem("token");
}

function buildNotification(
  topic: HeaderNotification["topic"],
  payload: MenuItemStatusMessage | OptionChoiceStatusMessage,
): HeaderNotification {
  if (topic === "menu-item-status") {
    const message = payload as MenuItemStatusMessage;
    return {
      id: `${topic}-${message.itemId}-${Date.now()}`,
      title: "Cập nhật trạng thái món",
      message: `Món \"${message.itemName}\" đã chuyển sang trạng thái ${message.status.toLowerCase()}.`,
      topic,
      createdAt: Date.now(),
    };
  }

  const message = payload as OptionChoiceStatusMessage;
  return {
    id: `${topic}-${message.optionChoiceId}-${Date.now()}`,
    title: "Cập nhật trạng thái tùy chọn",
    message: `Tùy chọn \"${message.optionChoiceName}\" đã chuyển sang trạng thái ${message.status.toLowerCase()}.`,
    topic,
    createdAt: Date.now(),
  };
}

export function useHeaderNotifications(role?: string) {
  const [notifications, setNotifications] = useState<HeaderNotification[]>([]);
  const [connected, setConnected] = useState(false);

  const canViewNotifications = true;
//   const canViewNotifications = useMemo(() => {
//     const normalizedRole = role?.trim().toUpperCase();
//     return normalizedRole ? PRIVILEGED_ROLES.has(normalizedRole) : false;
//   }, [role]);

  useEffect(() => {
    if (!canViewNotifications) {
      setNotifications([]);
      setConnected(false);
      return;
    }

    const token = getStoredToken();
    const beUrl = "http://localhost:8080";
    const socket = new SockJS(`${beUrl}/ws`);
    const stompClient = Stomp.over(socket);
    stompClient.debug = () => undefined;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    stompClient.connect(
      headers,
      () => {
        setConnected(true);

        stompClient.subscribe("/topic/menu-item-status", (frame) => {
          if (!frame.body) return;

          try {
            const payload = JSON.parse(frame.body) as MenuItemStatusMessage;
            setNotifications((current) => [
              buildNotification("menu-item-status", payload),
              ...current,
            ]);
          } catch {
            // Ignore malformed payloads.
          }
        });

        stompClient.subscribe("/topic/option-choice-status", (frame) => {
          if (!frame.body) return;

          try {
            const payload = JSON.parse(frame.body) as OptionChoiceStatusMessage;
            setNotifications((current) => [
              buildNotification("option-choice-status", payload),
              ...current,
            ]);
          } catch {
            // Ignore malformed payloads.
          }
        });
      },
      () => {
        setConnected(false);
      },
    );

    return () => {
      try {
        stompClient.disconnect(() => undefined);
      } catch {
        // Cleanup best-effort.
      }

      try {
        socket.close();
      } catch {
        // Cleanup best-effort.
      }
    };
  }, [canViewNotifications]);

  const unreadCount = notifications.length;

  return {
    canViewNotifications,
    connected,
    notifications,
    unreadCount,
    clearNotifications: () => setNotifications([]),
  };
}
