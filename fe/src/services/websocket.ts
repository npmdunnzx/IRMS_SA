import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// 1. Khởi tạo kết nối SockJS (phải đúng URL /ws bạn đã cấu hình)
const socket = new SockJS('http://localhost:8080/ws');

// 2. Bọc SockJS vào STOMP client
const stompClient = Stomp.over(socket);

// 3. Kết nối và xử lý
const connect = (token) => {
    const headers = {
        'Authorization': `Bearer ${token}` // Truyền JWT vào đây
    };

    stompClient.connect(headers, (frame) => {
        console.log('Connected: ' + frame);

        // 4. Đăng ký lắng nghe kênh (Topic)
        stompClient.subscribe('/topic/menu-item-status', (message) => {
            if (message.body) {
                const updatedItem = JSON.parse(message.body);
                console.log('Nhận thông báo mới:', updatedItem);
                
                // Cập nhật giao diện (UI) tại đây
                alert(`Món ${updatedItem.itemName} hiện đã ${updatedItem.status}`);
            }
        });
    }, (error) => {
        console.error('Lỗi kết nối STOMP:', error);
    });
};

// Gọi hàm kết nối
connect("your_jwt_token_here");