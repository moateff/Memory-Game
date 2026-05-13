import { BoardState } from "../models/BoardState.js";
import { GameCard } from "./GameCard.js";
import { IBoardComponent } from "../interfaces/IBoardComponent.js";
import { GameEngine } from "./GameEngine.js";

export class GameBoard extends HTMLElement implements IBoardComponent {

  private engine!: GameEngine;
  
  private state: BoardState;

  constructor() {
    super();

    this.state = {
      cards: [],
      locked: false
    };
  }

  connectedCallback(): void {
    this.render();
  }

  setEngine(engine: GameEngine): void {
    this.engine = engine;
  }

  init(): void {

    this.createCards();

    this.shuffleCards();

    this.mountCards();
  }

  private createCards(): void {

    const path = "./assets/images/";

    const images = [
      "card1.png",
      "card2.png",
      "card3.png",
      "card4.png",
      "card5.png",
      "card6.png",
      "card7.png",
      "card8.png",
    ];

    const duplicated = [...images, ...images];

    duplicated.forEach(image => {
      this.addCard(path + image);
    });
  }

  addCard(image: string): void {

    const card = this.createCard(image);

    card.addEventListener("click", () => {
      this.engine.selectCard(card);
    });

    this.state.cards.push(card);
  }

  private createCard(image: string): GameCard {
    const card = new GameCard();

    card.setAttribute("image", image);

    return card;
  }

  render(): void {

    this.innerHTML = `
      <div class="container">
        <div class="row g-3 justify-content-center" id="board-grid"></div>
      </div>
    `;
  }

  private mountCards(): void {

    const board = this.querySelector("#board-grid") as HTMLElement;

    if (!board) return;

    board.innerHTML = "";

    this.state.cards.forEach(card => {

      const wrapper = document.createElement("div");

      wrapper.className =
        "col-3 d-flex justify-content-center";

      wrapper.appendChild(card);

      board.appendChild(wrapper);
    });
  }

  isLocked(): boolean {
    return this.state.locked;
  }

  shuffleCards(): void {

    for (let i = this.state.cards.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [this.state.cards[i], this.state.cards[j]] =
        [this.state.cards[j], this.state.cards[i]];
    }
  }

  reset(): void {

    this.state.cards.forEach(card => card.remove());

    this.state = {
      cards: [],
      locked: false
    };

    this.init();
  }

  lock(): void {

    this.state.locked = true;

    this.state.cards.forEach(card => {
      card.lock();
    });
  }

  unlock(): void {

    this.state.locked = false;

    this.state.cards.forEach(card => {

      if (card.isMatched()) return;

      card.unlock();
    });
  }

  getNumberOfCards(): number {
    return this.state.cards.length;
  }
}

customElements.define("game-board", GameBoard);