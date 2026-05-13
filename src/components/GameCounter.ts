import { ICounterComponent } from "../interfaces/ICounterComponent.js";
import { CounterState } from "../models/CounterState.js";

export class GameCounter extends HTMLElement implements ICounterComponent {

  private state: CounterState;

  constructor() {
    super();

    this.state = {
      count: 0
    };
  }

  connectedCallback(): void {
    this.render();
  }

  getCount(): number {
    return this.state.count;
  }

  increment(): void {
    this.state.count++;

    this.updateView();
  }

  reset(): void {
    this.state.count = 0;

    this.updateView();
  }


  private render(): void {

    this.innerHTML = `
      <p class="counter mb-0" id="count">
        ${this.formatCount()}
      </p>
    `;
  }

  private updateView(): void {

    const el = this.querySelector("#count");

    if (!el) return;

    el.textContent = this.formatCount();
  }

  private formatCount(): string {

    const c =
      this.state.count.toString().padStart(2, "0");

    return `${c}`;
  }
}
  
customElements.define("game-counter", GameCounter);