import "./components/GameBoard.js";
import "./components/GameCard.js";
import "./components/GameCounter.js";
import "./components/GameTimer.js";
import "./components/GameSound.js";
import "./components/GameButton.js";
import { GameEngine } from "./components/GameEngine.js";
window.addEventListener("DOMContentLoaded", () => {
    const engine = new GameEngine();
    engine.init();
});
//# sourceMappingURL=main.js.map