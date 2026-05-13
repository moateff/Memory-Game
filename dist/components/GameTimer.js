export class GameTimer extends HTMLElement {
    constructor() {
        super();
        this.state = {
            intervalId: null,
            sec: 0,
            min: 0
        };
    }
    connectedCallback() {
        this.render();
    }
    start() {
        if (this.state.intervalId !== null)
            return;
        this.state.intervalId = window.setInterval(() => {
            this.state.sec++;
            if (this.state.sec === 60) {
                this.state.sec = 0;
                this.state.min++;
            }
            this.updateView();
        }, 1000);
    }
    stop() {
        if (this.state.intervalId !== null) {
            clearInterval(this.state.intervalId);
            this.state.intervalId = null;
        }
    }
    reset() {
        this.stop();
        this.state = {
            intervalId: null,
            sec: 0,
            min: 0
        };
        this.updateView();
    }
    render() {
        this.innerHTML = `
      <p class="timer" id="time">
        ${this.formatTime()}
      </p>
    `;
    }
    updateView() {
        const el = this.querySelector("#time");
        if (!el)
            return;
        el.textContent = this.formatTime();
    }
    getTime() {
        const m = this.state.min.toString().padStart(2, "0");
        const s = this.state.sec.toString().padStart(2, "0");
        return `${m}:${s}`;
    }
    formatTime() {
        const m = this.state.min.toString().padStart(2, "0");
        const s = this.state.sec.toString().padStart(2, "0");
        return `${m} : ${s}`;
    }
}
customElements.define("game-timer", GameTimer);
//# sourceMappingURL=GameTimer.js.map