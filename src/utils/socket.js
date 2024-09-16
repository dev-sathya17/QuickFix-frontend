import { io } from "socket.io-client";
import BACKEND_URL from "./config";

// Initializing the socket connection
const socket = io(BACKEND_URL, {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;
