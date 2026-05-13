import { GameCard } from "./GameCard.js";
export class GameBoard extends HTMLElement {
    constructor() {
        super();
        this.state = {
            cards: [],
            locked: false
        };
    }
    connectedCallback() {
        this.render();
    }
    setEngine(engine) {
        this.engine = engine;
    }
    init() {
        this.createCards();
        this.shuffleCards();
        this.mountCards();
    }
    createCards() {
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
    addCard(image) {
        const card = this.createCard(image);
        card.addEventListener("click", () => {
            this.engine.selectCard(card);
        });
        this.state.cards.push(card);
    }
    createCard(image) {
        const card = new GameCard();
        card.setAttribute("image", image);
        return card;
    }
    render() {
        this.innerHTML = `
      <div class="container">
        <div class="row g-3 justify-content-center" id="board-grid"></div>
      </div>
    `;
    }
    mountCards() {
        const board = this.querySelector("#board-grid");
        if (!board)
            return;
        board.innerHTML = "";
        this.state.cards.forEach(card => {
            const wrapper = document.createElement("div");
            wrapper.className =
                "col-3 d-flex justify-content-center";
            wrapper.appendChild(card);
            board.appendChild(wrapper);
        });
    }
    isLocked() {
        return this.state.locked;
    }
    shuffleCards() {
        for (let i = this.state.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.state.cards[i], this.state.cards[j]] =
                [this.state.cards[j], this.state.cards[i]];
        }
    }
    reset() {
        this.state.cards.forEach(card => card.remove());
        this.state = {
            cards: [],
            locked: false
        };
        this.init();
    }
    lock() {
        this.state.locked = true;
        this.state.cards.forEach(card => {
            card.lock();
        });
    }
    unlock() {
        this.state.locked = false;
        this.state.cards.forEach(card => {
            if (card.isMatched())
                return;
            card.unlock();
        });
    }
    getNumberOfCards() {
        return this.state.cards.length;
    }
}
customElements.define("game-board", GameBoard);
//# sourceMappingURL=GameBoard.js.map