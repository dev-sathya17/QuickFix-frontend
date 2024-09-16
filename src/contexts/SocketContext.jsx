import { createContext, useContext, useEffect } from "react";
import socket from "../utils/socket";
const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export const useSocket = () => {
  return useContext(SocketContext);
};
