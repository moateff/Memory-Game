const registerPopup = document.getElementById("registerPopup");
const registerButton = document.getElementById("register-btn");
const username = document.getElementById("username");
const error = document.getElementById("error");
registerButton.addEventListener("click", () => {
    const name = username.value;
    if (!validateInput(name)) {
        error.innerHTML = "Invalid username";
        return;
    }
    localStorage.setItem("username", name);
    username.value = "";
    registerPopup.remove();
});
function validateInput(name) {
    if (!name.trim())
        return false;
    if (name.length > 20)
        return false;
    if (name.includes(" ") || name[0] !== "@")
        return false;
    return true;
}
username.addEventListener("input", () => {
    const name = username.value;
    if (!validateInput(name)) {
        error.innerHTML = "Invalid username";
    }
    else {
        error.innerHTML = "";
    }
});
const winPopup = document.getElementById("winPopup");
const winTitle = document.getElementById("winTitle");
const winmessage = document.getElementById("winMessage");
const playAgainButton = document.getElementById("play-again-button");
const score = document.getElementById("score");
const moves = document.getElementById("moves");
const time = document.getElementById("timer");
export function showWinPopup(moves, time) {
    winPopup.classList.remove("hidden");
    const name = localStorage.getItem("username");
    winTitle.innerText =
        `🎉 Congrats ${name}!`;
    winmessage.innerText =
        `Moves: ${moves}  Time: ${time}s`;
}
playAgainButton.addEventListener("click", () => {
    winPopup.classList.add("hidden");
});
//# sourceMappingURL=popup.js.map