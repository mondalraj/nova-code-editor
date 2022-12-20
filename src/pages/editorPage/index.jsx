import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ACTIONS from "../../utils/eventActions";
import { initSocket } from "../../utils/socket";
import CodeEditor from "./components/CodeEditor";

const EditorPage = () => {
  const [activeClients, setActiveClients] = useState([]);
  const { roomId, username } = useParams();
  const navigate = useNavigate();
  const socketRef = useRef(null);

  useEffect(() => {
    const initWebSocket = async () => {
      const socket = await initSocket();
      socketRef.current = socket;

      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(err) {
        console.log("Error connecting to socket", err);
        navigate("/");
      }

      // Joining Room
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username,
      });

      // Someone joined the room
      socketRef.current.on(ACTIONS.JOINED, ({ clients, user, socketId }) => {
        if (user !== username) {
          console.log(username, "joined the room", clients);
        } else {
          console.log("You joined the room", clients);
        }
        setActiveClients(clients);
      });

      // Someone leaving the room
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        console.log(username, "left the room");
        // Updating the clients state using the socketId by applying a filter
        setActiveClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    initWebSocket();
    return () => {
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.disconnect();
    };
  }, []);

  if (!roomId || !username) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Editor Page</h1>
      {activeClients.map((client) => {
        return <div key={client.socketId}>{client.username}</div>;
      })}
      <CodeEditor socketRef={socketRef} />
    </div>
  );
};

export default EditorPage;
