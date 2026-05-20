export class GameButton extends HTMLElement {
    constructor() {
        super();
    }
    click() {
        if (this.engine.gameRunning()) {
            this.engine.reset();
            this.startGame();
        }
        else {
            this.startGame();
        }
    }
    setEngine(engine) {
        this.engine = engine;
    }
    connectedCallback() {
        this.render();
    }
    startGame() {
        this.engine.startGame();
    }
    render() {
        this.innerHTML = `
      <button class="btn bg-black text-white fw-bold px-5 py-2" id="game-btn">
        Start Game
      </button>
    `;
        this.button = this.querySelector("#game-btn");
        this.button.addEventListener("click", () => {
            this.click();
            this.button.innerHTML = "Restart Game";
            this.button.classList.remove("bg-black", "text-white");
            this.button.classList.add("btn-warning");
        });
    }
    reset() {
        this.button.innerHTML = "Start Game";
        this.button.classList.remove("btn-warning");
        this.button.classList.add("bg-black", "text-white");
    }
}
customElements.define("game-button", GameButton);
//# sourceMappingURL=GameButton.js.map