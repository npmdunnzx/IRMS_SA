import SockJS from "sockjs-client";
import Stomp from "stompjs";

export type MenuItemStatusMessage = {
  itemId: number;
  itemName: string;
  status: string;
};

type MenuStatusCallback = (message: MenuItemStatusMessage) => void;

let socket: any = null;
let stompClient: any = null;

export function connectWebSocket(
  token: string | null,
  onMessage: MenuStatusCallback,
): void {
  disconnectWebSocket();

  // Khởi tạo kết nối SockJS (WebSocket không qua Vite proxy, cần dùng trực tiếp BE URL)
  const beUrl = "http://localhost:8080";
  socket = new SockJS(`${beUrl}/ws`);
  stompClient = Stomp.over(socket);
  stompClient.debug = () => undefined; // Tắt debug messages

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  stompClient.connect(
    headers,
    () => {
      console.log("Connected to WebSocket");

      // Đăng ký lắng nghe kênh (Topic)
      stompClient?.subscribe(
        "/topic/menu-item-status",
        (message: { body?: string }) => {
          if (message.body) {
            try {
              const updatedItem = JSON.parse(
                message.body,
              ) as MenuItemStatusMessage;
              console.log("Nhận thông báo mới:", updatedItem);
              onMessage(updatedItem);
            } catch (error) {
              console.error("Lỗi parse message:", error);
            }
          }
        },
      );
    },
    (error: unknown) => {
      console.error("Lỗi kết nối WebSocket:", error);
    },
  );
}

export function disconnectWebSocket(): void {
  if (stompClient) {
    try {
      stompClient.disconnect();
    } catch {
      // Bỏ qua lỗi cleanup
    }
    stompClient = null;
  }

  if (socket) {
    socket.close();
    socket = null;
  }
}
