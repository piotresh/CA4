//required for front end communication between client and server

const socket = io();

const inboxPeople = document.querySelector(".inbox__people");


let userName = "";
let id;
const newUserConnected = function (data) {
    

    //give the user a random unique id
    id = Math.floor(Math.random() * 1000000);
    userName = 'user-' +id;
    //console.log(typeof(userName));   

    //emit an event with the user id
    socket.emit("new user", userName);
    //call
    addToUsersBox(userName);
};

const addToUsersBox = function (userName) {
    //This if statement checks whether an element of the user-userlist
    //exists and then inverts the result of the expression in the condition
    //to true, while also casting from an object to boolean
    if (!!document.querySelector(`.${userName}-userlist`)) {
        return;
    
    }
    
    //setup the divs for displaying the connected users
    //id is set to a string including the username
    const userBox = `
    <div class="chat_id ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `;
    //set the inboxPeople div with the value of userbox
    inboxPeople.innerHTML += userBox;
};

//call 
newUserConnected();

//when a new user event is detected
socket.on("new user", function (data) {
  data.map(function (user) {
          if (user !== userName && !document.querySelector(`.${user}-userlist`)) {
              messageBox.innerHTML += `
              <div class="incoming__message">
                  <div class="received__message">
                      <p>${user} has joined the chat!</p>
                  </div>
              </div>`;
          }
          return addToUsersBox(user);
      });
});

//when a user leaves
socket.on("user disconnected", function (userName) {
  document.querySelector(`.${userName}-userlist`).remove();
    messageBox.innerHTML += `
      <div class="incoming__message">
          <div class="received__message">
              <p>${userName} has left :((( </p>
          </div>
      </div>`;
});


const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");

const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  const receivedMsg = `
  <div class="incoming__message">
    <div class="received__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="message__author">${user}</span>
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  const myMsg = `
  <div class="outgoing__message">
    <div class="sent__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  //is the message sent or received
  messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputField.value) {
    return;
  }

  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  });

  inputField.value = "";
});

socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message });
});

let typingTimer; // Variable to store the typing timer
let typingUsers = new Set(); // Set to store users who are typing

// Function to update the typing indicator
function updateTypingIndicator() {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingUsers.size > 0 && !typingUsers.has(userName)) { // Check if current user is not typing
        typingIndicator.innerText = [...typingUsers].join(', ') + " is typing...";
    } else {
        typingIndicator.innerText = ""; // Clear the typing indicator if no one else is typing
    }
}

// Event listener for keyup event on the input field
document.querySelector(".message_form__input").addEventListener("keyup", function() {
    socket.emit("typing"); // Emit "typing" event to the server when a user starts typing
    typingUsers.add(userName); // Add the current user to the typingUsers set
    updateTypingIndicator(); // Update the typing indicator
    clearTimeout(typingTimer); // Clear the previous typing timer
    typingTimer = setTimeout(function() {
        socket.emit("stop typing"); // Emit "stop typing" event after a delay
        typingUsers.delete(userName); // Remove the current user from the typingUsers set
        updateTypingIndicator(); // Update the typing indicator
    }, 2000); // 2000 milliseconds (2 seconds) delay before emitting "stop typing"
});

// Event listener for keydown event on the input field
document.querySelector(".message_form__input").addEventListener("keydown", function() {
    clearTimeout(typingTimer); // Clear the typing timer when a key is pressed
});

// Update UI when someone starts typing
socket.on("typing", function (user) {
    typingUsers.add(user); // Add the user to the typingUsers set
    updateTypingIndicator(); // Update the typing indicator
});

// Update UI when someone stops typing
socket.on("stop typing", function (user) {
    typingUsers.delete(user); // Remove the user from the typingUsers set
    updateTypingIndicator(); // Update the typing indicator
});



