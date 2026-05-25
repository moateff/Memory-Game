const registerPopup = document.getElementById("registerPopup");
const registerButton = document.getElementById("register-btn");
const username = document.getElementById("username");
const error = document.getElementById("error");
registerButton.addEventListener("click", () => {
    const name = username.value;
    if (!validateInput(name))
        return;
    sessionStorage.setItem("username", name.trim());
    username.value = "";
    registerPopup.remove();
});
function validateInput(name) {
    if (name.length == 0) {
        error.innerHTML = "Please enter a username";
        return false;
    }
    if (name[0] !== "@") {
        error.innerHTML = "Username must start with @";
        return false;
    }
    if (name.includes(" ")) {
        error.innerHTML = "Username must not contain spaces";
        return false;
    }
    if (name.length > 10) {
        error.innerHTML = "Username must be less than 10 characters";
        return false;
    }
    error.innerHTML = "";
    return true;
}
username.addEventListener("input", () => {
    validateInput(username.value);
});
const winPopup = document.getElementById("winPopup");
const winTitle = document.getElementById("winTitle");
const winmessage = document.getElementById("winMessage");
const playAgainButton = document.getElementById("play-again-button");
export function showWinPopup(moves, time) {
    winPopup.classList.remove("hidden");
    const name = sessionStorage.getItem("username");
    winTitle.innerText =
        `🎉 Congrats ${name}!`;
    winmessage.innerText =
        `Moves: ${moves},  Time: ${time}s`;
}
playAgainButton.addEventListener("click", () => {
    winPopup.classList.add("hidden");
});
//# sourceMappingURL=popup.js.map