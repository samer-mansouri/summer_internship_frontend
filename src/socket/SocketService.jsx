import { io } from 'socket.io-client';
import UserService from '@/services/user-service';

class SocketService {
  constructor() {
    this.socket = null;
  }

  async connect() {
    const token = await UserService.userToken();
    if (token) {
      this.socket = io(import.meta.env.VITE_BACKEND_URL, {
        query: {
          userId: token.id,
        },
      });

      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

const socketService = new SocketService();
export default socketService;
