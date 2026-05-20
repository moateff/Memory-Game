import { CardState } from "../models/CardState.js";
import { ICardComponent } from "../interfaces/ICardComponent.js";

export class GameCard extends HTMLElement implements ICardComponent {

  public cardId: string;

  private state: CardState;

  private front!: HTMLElement;
  private back!: HTMLImageElement;

  constructor() {
    super();

    this.cardId = crypto.randomUUID();

    this.state = {
      cardId: this.cardId,
      image : "",
      flipped: false,
      locked: false,
      matched: false
    };
  }

  connectedCallback() {
    this.render();
    this.updateView();
  }

  getImage(): string {
    return this.state.image;
  }

  flip(): void {
    if (this.state.locked) return;
    this.state.flipped = true;
    this.updateView();
  }

  unflip(): void {
    this.state.flipped = false;
    this.updateView();
  }

  lock(): void {
    this.state.locked = true;
  }

  unlock(): void {
    this.state.locked = false;
  }

  setMatched(): void {
    this.state.matched = true;
    this.state.flipped = true;
    this.updateView();
  }

  isFlipped(): boolean {
    return this.state.flipped;
  }

  isLocked(): boolean {
    return this.state.locked;
  }

  isMatched(): boolean {
    return this.state.matched;
  }

  reset(): void {
    this.state.flipped = false;
    this.state.locked = false;
    this.state.matched = false;

    this.updateView();
  }

  private updateView(): void {
    if (!this.front || !this.back) return;

    const visible =
      this.state.flipped ||
      this.state.matched;

    this.front.style.display = visible ? "none" : "flex";
    this.back.style.display = visible ? "block" : "none";
  }

  private render(): void {

    const image = this.getAttribute("image");
    
    if (!image) {
      console.warn(`GameCard ${this.id}: No image attribute provided`);
    }

    this.state.image = image || "";

    this.innerHTML = `
      <div class="d-flex justify-content-center">

        <div class="front">
          <div class="
            bg-warning
            rounded
            d-flex
            align-items-center
            justify-content-center
            card-box
            text-black
          ">
            ?
          </div>
        </div>

        <img
          class="back rounded card-box"
          src="${this.state.image}"
          alt="Game card"
        />

      </div>
    `;

    this.front = this.querySelector(".front") as HTMLElement;
    this.back = this.querySelector(".back") as HTMLImageElement;
  }
}

customElements.define("game-card", GameCard);