import { io, Socket } from "socket.io-client";
import "./assets/scss/style.scss";
import { ChatMessageData, ClientToServerEvents, ServerToClientEvents } from "@shared/types/SocketEvents.types";

const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST as string;
console.log("SOCKET_HOST:", SOCKET_HOST);

// Forms
const loginFormEl = document.querySelector("#login-form") as HTMLFormElement;
const loginUsernameInputEl = document.querySelector("#username") as HTMLInputElement;
const messageEl = document.querySelector("#message") as HTMLInputElement;
const messageFormEl = document.querySelector("#message-form") as HTMLFormElement;
const loginConnectBtnEl = document.querySelector("#connectBtn") as HTMLButtonElement;
const loginRoomSelectEl = document.querySelector("#room") as HTMLSelectElement;

// Lists
const messagesEl = document.querySelector("#messages") as HTMLDivElement;
// const usersEl = document.querySelector("#users") as HTMLDivElement;


// Views
const chatView = document.querySelector("#chat-wrapper") as HTMLDivElement;
const loginView = document.querySelector("#login-wrapper") as HTMLDivElement;

// User Details
let roomId: string | null;
let username: string | null = null;


// Connect to Socket.IO Server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST);

/**
 * Functions
 */
const addMessageToChat = (payload: ChatMessageData, ownMessage = false) => {
	// Create a new LI element
	const msgEl = document.createElement("li");

	// Set CSS-classes
	msgEl.classList.add("message");


	// If it's our own message, add the `own-message` class
	if (ownMessage) {
		msgEl.classList.add("own-message");
	}

	const time = new Date(payload.timestamp).toLocaleTimeString();

	// Set text content
	msgEl.innerHTML =  ownMessage
	? `
		<span class="content">${payload.content}</span>
		<span class="time">${time}</span>
	`
	:`
		<span class="user">${payload.username}</span>
		<span class="content">${payload.content}</span>
		<span class="time">${time}</span>
	`;

	// Append LI to messages list
	messagesEl.appendChild(msgEl);
}

const addNoticeToChat = (msg: string, timestamp?: number) => {
	if (!timestamp) {
		timestamp = Date.now();
	}

	// Create a new LI element
	const noticeEl = document.createElement("li");

	// Set CSS-classes
	noticeEl.classList.add("notice");

	// Get human readable time
	const time = new Date(timestamp).toLocaleTimeString();  // "13:37:00"

	// Set text content
	noticeEl.innerHTML = `
			<span class="content">${msg}</span>
			<span class="time">${time}</span>
		`;

	// Append LI to messages list
	messagesEl.appendChild(noticeEl);
}

// Show chat view
const showChatView = () => {
	loginView.classList.add("hide");
	chatView.classList.remove("hide");
}

// Show login view
const showLoginView = () => {

	// Disable "Connect"-button and clear room list
	loginConnectBtnEl.disabled = true;
	loginRoomSelectEl.innerHTML = `
		<option selected>Loading...</option>
		`;


	// Request a list of rooms from the server
	// once we get them populate the <select> element with the rooms</select>
	// After that, enable the "Connect" button"
	console.log("Requesting rooms");
	socket.emit("getRoomList", (rooms) => {
		console.log(rooms);

		// Update roomlist with options for each room
		loginRoomSelectEl.innerHTML = rooms
			.map(room => `<option value="${room.id}">${room.name}</option>`)
			.join("");
		
		loginConnectBtnEl.disabled = false;
	});

	chatView.classList.add("hide");
	loginView.classList.remove("hide");
}

const userJoinReqCallback = (success: boolean) => {

	if(!success){
		alert("No access");
		return
	}

	showChatView();
}

/**
 * Socket Event Listeners
 */

// Listen for when connection is established
socket.on("connect", () => {
	console.log("💥 Connected to the server", socket.id);

	// Show login view
	showLoginView();
});

// Listen for when server got tired of us
socket.on("disconnect", () => {
	console.log("🥺 Got disconnected from the server");
	addNoticeToChat("You've been disconnected from the server");
});

// Listen for new chat messages
socket.on("chatMessage", (payload) => {
	console.log("📨 YAY SOMEONE WROTE SOMETHING!!!!!!!", payload);
	addMessageToChat(payload);
});

socket.on("userJoined", (username, timestamp) => {
	console.log("A new user has joined the chat: ", username, timestamp);
	addNoticeToChat(username, timestamp);
});

socket.io.on("reconnect", () => {
	console.log("Reconnected to the server");

	if(username && roomId){
		socket.emit("userJoinRequest", username, roomId, userJoinReqCallback)
	}

});

/**
 * DOM Event Listeners
 */

// Save username and show chat
loginFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// 💇
	username = loginUsernameInputEl.value.trim();
	roomId = loginRoomSelectEl.value;


	// If no username, no join
	if (!username || !roomId) {
		alert("No username? No chat 4 you!");
		return;
	}

	// Set username

	socket.emit("userJoinRequest", username, roomId, userJoinReqCallback);
	

});

// Send message to the server when form is submitted
messageFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// 💇
	const trimmedMessage = messageEl.value.trim();

	// If no message, no send
	if (!trimmedMessage || !username || !roomId) {
		return;
	}

	// Construct message payload
	const payload: ChatMessageData = {
		content: trimmedMessage,
		timestamp: Date.now(),
		roomId,
		username,
	}

	// 📮 Send (emit) the message to the server
	socket.emit("sendChatMessage", payload);
	console.log("Emitted 'sendChatMessage' event to server", payload);

	// Add our own message to the chat
	addMessageToChat(payload, true);

	// Clear input field
	messageEl.value = "";
	messageEl.focus();
});
