import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import socketService from "../../services/socketService";
import { setConnectionStatus } from "../../redux/chatSlice";

const ChatProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user: authUser } = use(AuthContext);
  const { user } = useSelector((state) => state.products);

  // Initialize socket connection when user is authenticated
  useEffect(() => {
    if (authUser && user?._id) {
      // Connect to socket
      const socket = socketService.connect(user._id);

      // Set connection status
      dispatch(setConnectionStatus(socket ? true : false));

      return () => {
        // Cleanup on unmount
        socketService.disconnect();
        dispatch(setConnectionStatus(false));
      };
    }
  }, [authUser, user?._id, dispatch]);

  return <>{children}</>;
};

export default ChatProvider;
