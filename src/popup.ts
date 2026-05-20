const registerPopup = document.getElementById("registerPopup") as HTMLDivElement;
const registerButton = document.getElementById("register-btn") as HTMLButtonElement;
const username = document.getElementById("username") as HTMLInputElement;
const error = document.getElementById("error") as HTMLParagraphElement;

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

function validateInput(name: string): boolean
{
    if (!name.trim()) return false;
    if (name.length > 20) return false;
    if (name.includes(" ") || name[0] !== "@") return false;
    return true;
}

username.addEventListener("input", () => {
    const name = username.value;

    if (!validateInput(name)) {
        error.innerHTML = "Invalid username";
    } else {
        error.innerHTML = "";
    }
});

const winPopup = document.getElementById("winPopup") as HTMLDivElement;
const winTitle = document.getElementById("winTitle") as HTMLDivElement;
const winmessage = document.getElementById("winMessage") as HTMLDivElement;
const playAgainButton = document.getElementById("play-again-button") as HTMLButtonElement;

const score = document.getElementById("score") as HTMLDivElement;
const moves = document.getElementById("moves") as HTMLDivElement;
const time = document.getElementById("timer") as HTMLDivElement;


export function showWinPopup(moves: number, time: string): void {

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

