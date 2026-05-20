import { IButtonComponent } from "../interfaces/IButtonComponent.js";
import { GameEngine } from "./GameEngine.js";

export class GameButton extends HTMLElement implements IButtonComponent {

  private engine!: GameEngine;
  
  private button!: HTMLButtonElement;

  constructor() {
    super();
  }

  click(): void {
    if (this.engine.gameRunning()) {
      this.engine.reset();
      this.startGame();
    } else {
      this.startGame();
    }
  }

  setEngine(engine: GameEngine): void {
    this.engine = engine;
  }

  connectedCallback(): void {
    this.render();
  }

  startGame(): void {
    this.engine.startGame();
  }

  private render(): void
  {
    this.innerHTML = `
      <button class="btn bg-black text-white fw-bold px-5 py-2" id="game-btn">
        Start Game
      </button>
    `;

    this.button = this.querySelector("#game-btn") as HTMLButtonElement;

    this.button.addEventListener("click", () => {
      this.click();

      this.button.innerHTML = "Restart Game";
      this.button.classList.remove("bg-black", "text-white");
      this.button.classList.add("btn-warning");
    });
  }

  reset(): void {
    this.button.innerHTML = "Start Game";
    this.button.classList.remove("btn-warning");
    this.button.classList.add("bg-black", "text-white");
  }
}

customElements.define("game-button", GameButton);