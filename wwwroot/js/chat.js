"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Amig nincs kapcsolat, addig nem használható a küldés gomb
document.getElementById("sendButton").disabled = true;


connection.on("ReceiveMessage", (user, message) => {
    var li = document.createElement("li")
    document.getElementById("messagesList").appendChild(li);

    li.textContent = `${user}: ${message}`
})


connection.start()
    .then(() => { document.getElementById("sendButton").disabled = false })
    .catch((err) => console.error(err.toString()))


document.getElementById("sendButton").addEventListener("click", (event) => {
    var user = document.getElementById("userInput").value
    var message = document.getElementById("messageInput").value

    connection.invoke("SendMessage", user, message)
        .catch((err) => console.error(err.toString()))

    event.preventDefault()
})