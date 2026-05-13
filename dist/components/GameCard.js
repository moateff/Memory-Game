export class GameCard extends HTMLElement {
    constructor() {
        super();
        this.cardId = crypto.randomUUID();
        this.state = {
            cardId: this.cardId,
            image: "",
            flipped: false,
            locked: false,
            matched: false
        };
    }
    connectedCallback() {
        this.render();
        this.updateView();
    }
    getImage() {
        return this.state.image;
    }
    flip() {
        if (this.state.locked)
            return;
        this.state.flipped = true;
        this.updateView();
    }
    unflip() {
        this.state.flipped = false;
        this.updateView();
    }
    lock() {
        this.state.locked = true;
    }
    unlock() {
        this.state.locked = false;
    }
    setMatched() {
        this.state.matched = true;
        this.state.flipped = true;
        this.updateView();
    }
    isFlipped() {
        return this.state.flipped;
    }
    isLocked() {
        return this.state.locked;
    }
    isMatched() {
        return this.state.matched;
    }
    reset() {
        this.state.flipped = false;
        this.state.locked = false;
        this.state.matched = false;
        this.updateView();
    }
    updateView() {
        if (!this.front || !this.back)
            return;
        const visible = this.state.flipped ||
            this.state.matched;
        this.front.style.display = visible ? "none" : "flex";
        this.back.style.display = visible ? "block" : "none";
    }
    render() {
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
        this.front = this.querySelector(".front");
        this.back = this.querySelector(".back");
    }
}
customElements.define("game-card", GameCard);
//# sourceMappingURL=GameCard.js.map