const registerPopup = document.getElementById("registerPopup") as HTMLDivElement;
const registerButton = document.getElementById("register-btn") as HTMLButtonElement;
const username = document.getElementById("username") as HTMLInputElement;
const error = document.getElementById("error") as HTMLParagraphElement;

registerButton.addEventListener("click", () => {

    const name = username.value;

    if (!validateInput(name)) return;

    sessionStorage.setItem("username", name.trim());
    username.value = "";

    registerPopup.remove();
});

function validateInput(name: string): boolean
{
    if (name.length > 0 && name[0] !== "@") 
    {
        error.innerHTML = "Username must start with @";
        return false;
    }

    if (name.includes(" "))
    {
        error.innerHTML = "Username must not contain spaces";
        return false;
    }

    if (name.length > 10) 
    {
        error.innerHTML = "Username must be less than 10 characters";
        return false;
    }

    error.innerHTML = "";
    return true;
}

username.addEventListener("input", () => {
    validateInput(username.value);
});

const winPopup = document.getElementById("winPopup") as HTMLDivElement;
const winTitle = document.getElementById("winTitle") as HTMLDivElement;
const winmessage = document.getElementById("winMessage") as HTMLDivElement;
const playAgainButton = document.getElementById("play-again-button") as HTMLButtonElement;


export function showWinPopup(moves: number, time: string): void {

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

