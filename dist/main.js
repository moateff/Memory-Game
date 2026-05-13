import "./components/GameBoard.js";
import "./components/GameCard.js";
import "./components/GameCounter.js";
import "./components/GameTimer.js";
import { GameEngine } from "./components/GameEngine.js";
window.addEventListener("DOMContentLoaded", () => {
    const engine = new GameEngine();
    engine.init();
    const restart = document.querySelector("#restart-btn");
    restart?.addEventListener("click", () => {
        engine.reset();
    });
});
//# sourceMappingURL=main.js.map