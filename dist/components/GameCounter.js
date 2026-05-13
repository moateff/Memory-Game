export class GameCounter extends HTMLElement {
    constructor() {
        super();
        this.state = {
            count: 0
        };
    }
    connectedCallback() {
        this.render();
    }
    getCount() {
        return this.state.count;
    }
    increment() {
        this.state.count++;
        this.updateView();
    }
    reset() {
        this.state.count = 0;
        this.updateView();
    }
    render() {
        this.innerHTML = `
      <p class="counter mb-0" id="count">
        ${this.formatCount()}
      </p>
    `;
    }
    updateView() {
        const el = this.querySelector("#count");
        if (!el)
            return;
        el.textContent = this.formatCount();
    }
    formatCount() {
        const c = this.state.count.toString().padStart(2, "0");
        return `${c}`;
    }
}
customElements.define("game-counter", GameCounter);
//# sourceMappingURL=GameCounter.js.map