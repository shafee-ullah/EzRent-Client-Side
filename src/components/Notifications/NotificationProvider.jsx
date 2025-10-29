import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../redux/notificationSlice";
import socketService from "../../services/socketService";
import { NotificationToastContainer } from "./NotificationToast";

const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.products);
  
  const [toasts, setToasts] = useState([]);

  // Fetch notifications on mount
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchNotifications(user._id));
    }
  }, [user?._id, dispatch]);

  // Listen for real-time notifications via socket
  useEffect(() => {
    if (!user?._id || !socketService.isSocketConnected()) return;

    const handleNewNotification = (notification) => {
      console.log("📬 Real-time notification received:", notification);
      
      // Add to toast notifications
      setToasts((prev) => [
        ...prev,
        {
          id: notification._id || `toast-${Date.now()}`,
          ...notification,
          duration: 5000,
        },
      ]);
    };

    const socket = socketService.getSocket();
    if (socket) {
      socket.on("new-notification", handleNewNotification);
    }

    return () => {
      if (socket) {
        socket.off("new-notification", handleNewNotification);
      }
    };
  }, [user?._id]);

  // Remove toast
  const handleRemoveToast = (toastId) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  };

  return (
    <>
      {children}
      <NotificationToastContainer
        toasts={toasts}
        onRemoveToast={handleRemoveToast}
      />
    </>
  );
};

export default NotificationProvider;
