/**
 * Socket Controller
 */
import Debug from "debug";
import prisma from "../prisma"
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "@shared/types/SocketEvents.types";

// Create a new debug instance
const debug = Debug('chat:socket_controller');

// Handle a user connecting
export const handleConnection = (
	socket: Socket<ClientToServerEvents, ServerToClientEvents>,
	io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
	debug("🙋 A user connnected", socket.id);

	// Listen for incoming chat messages
	socket.on("sendChatMessage", (payload) => {
		debug("📨 New chat message", socket.id, payload);

		// Broadcast message to everyone connected EXCEPT the sender
		socket.to(payload.roomId).emit("chatMessage", payload);
	});

	socket.on("userJoinRequest", (username, roomId, callback) => {
		debug("User %s from socket %s wants to join room %s", username, socket.id, roomId);
		// Join room roomId
		socket.join(roomId);


		// Always let the user in for now
		// Later check if username is in use
		// and deny if that is the case
		callback(true);

		
		io.to(roomId).emit("userJoined", username, Date.now());

	});

	socket.on("getRoomList", async (callback) => {
		debug("Got request for rooms");

		const rooms = await prisma.room.findMany({
			orderBy: {
				name: "asc",
			},
		});
		callback(rooms);


	});

	// Handle a user disconnecting
	socket.on("disconnect", () => {
		debug("👋 A user disconnected", socket.id);
	});
}
