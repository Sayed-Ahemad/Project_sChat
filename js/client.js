const socket = io("http://localhost:8000");

const form = document.getElementById("send-box");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

// Ask user to enter his name to join the chat
const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

// new user join
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

// user send message, receive it
socket.on("receive", (data) => {
  append(`${data.name} : ${data.message}`, "left");
});

// user left
socket.on("left", (data) => {
  append(`${name} left the chat`, "right");
});

// Form submit

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
