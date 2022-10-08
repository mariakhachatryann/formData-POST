"use strict";

const subscribeForm = document.querySelector("form#subscribe");
const signInForm = document.querySelector("form#sign-in");

const messages = {
    waiting: "waiting...",
    success: "success!",
    failure: "Something went wrong. Please try again"
};

// without JSON
subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = document.createElement("p");
    message.classList.add("message");
    e.target.append(message);
    message.textContent = messages.waiting;

    const data = new FormData(e.target);

    const request = new XMLHttpRequest();
    request.open("POST", "server/server.php");
    request.send(data);

    request.addEventListener("load", () => {
        message.textContent = request.status === 200 ? messages.success : messages.failure;
    });

    e.target.reset();
});


// with JSON
signInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    
    const dataObj = {};
    data.forEach((value, key) => {
        dataObj[key] = value;
    });

    const request = new XMLHttpRequest();
    request.open("POST", "server/server.php");
    request.setRequestHeader("content-type", "application/json");
    request.send(JSON.stringify(dataObj));

    e.target.reset();
});