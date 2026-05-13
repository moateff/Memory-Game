import { ITimerComponent } from "../interfaces/ITimerComponent.js";
import { TimerState } from "../models/TimerState.js";

export class GameTimer extends HTMLElement implements ITimerComponent {

  private state: TimerState;

  constructor() {
    super();

    this.state = {
      intervalId: null,
      sec: 0,
      min: 0
    };
  }

  connectedCallback(): void {
    this.render();
  }

  start(): void {

    if (this.state.intervalId !== null) return;

    this.state.intervalId = window.setInterval(() => {

      this.state.sec++;

      if (this.state.sec === 60) {
        this.state.sec = 0;
        this.state.min++;
      }

      this.updateView();

    }, 1000);
  }

  stop(): void {

    if (this.state.intervalId !== null) {
      clearInterval(this.state.intervalId);
      this.state.intervalId = null;
    }
  }

  reset(): void {

    this.stop();

    this.state = {
      intervalId: null,
      sec: 0,
      min: 0
    };

    this.updateView();
  }

  private render(): void {

    this.innerHTML = `
      <p class="timer" id="time">
        ${this.formatTime()}
      </p>
    `;
  }

  private updateView(): void {

    const el = this.querySelector("#time");

    if (!el) return;

    el.textContent = this.formatTime();
  }

  getTime(): string {
    const m = this.state.min.toString().padStart(2, "0");
    const s = this.state.sec.toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  private formatTime(): string {

    const m =
      this.state.min.toString().padStart(2, "0");

    const s =
      this.state.sec.toString().padStart(2, "0");

    return `${m} : ${s}`;
  }
}
  
customElements.define("game-timer", GameTimer);