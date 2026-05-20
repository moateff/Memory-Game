import "./components/GameBoard.js";
import "./components/GameCard.js";
import "./components/GameCounter.js";
import "./components/GameTimer.js";
import "./components/GameSound.js";
import "./components/GameButton.js";
import "./popup.js";
import { GameEngine } from "./components/GameEngine.js";
window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("username") === null) {
        document.getElementById("registerPopup")?.classList.remove("hidden");
    }
    const engine = new GameEngine();
    engine.init();
});
//# sourceMappingURL=main.js.map