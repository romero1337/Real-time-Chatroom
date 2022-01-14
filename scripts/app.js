// DOM QUERIES
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// ADD A NEW CHAT
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

// UPDATE USERNAME
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // UPDATE NAME VIA CHATROOM
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // RESET THE FORM
    newNameForm.reset();
    // SHOW, THEN HIDE THE UPDATE MESSAGE
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMssg.innerText = '', 3000);
});

// UPDATE THE CHAT ROOM
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

// CHECK LOCAL STORAGE FOR A NAME
const username = localStorage.username ? localStorage.username : 'anon';

// CLASS INSTANCES
const chatUI = new ChatUi(chatList);
const chatroom = new Chatroom('gaming', username);

// GET CHATS AND RENDER
chatroom.getChats(data => chatUI.render(data));