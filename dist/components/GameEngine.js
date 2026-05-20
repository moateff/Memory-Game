import { GameSound } from "./GameSound.js";
import { showWinPopup } from "../popup.js";
export class GameEngine {
    constructor() {
        this.board = document.querySelector("#board");
        this.timer = document.querySelector("#timer");
        const moves = document.querySelector("#moves");
        const score = document.querySelector("#score");
        this.button = document.querySelector("#start-btn");
        this.sound = new GameSound();
        this.state = {
            firstCard: null,
            secondCard: null,
            moves,
            score,
            gameRunning: false
        };
        this.board.setEngine(this);
        this.button.setEngine(this);
    }
    init() {
        this.board.init();
        this.board.lock();
        this.sound.init();
    }
    selectCard(card) {
        if (this.board.isLocked())
            return;
        if (!card)
            return;
        if (card.isMatched())
            return;
        if (card.isFlipped())
            return;
        card.flip();
        this.sound.playFlip();
        if (!this.state.firstCard) {
            this.state.firstCard = card;
            return;
        }
        this.state.secondCard = card;
        this.state.moves?.increment();
        this.checkMatch();
    }
    checkMatch() {
        const first = this.state.firstCard;
        const second = this.state.secondCard;
        if (!first || !second)
            return;
        this.board.lock();
        if (first.getImage() === second.getImage()) {
            first.setMatched();
            second.setMatched();
            this.state.score?.increment();
            // this.sound.playMatch();
            this.resetSelection();
            this.board.unlock();
            this.checkWin();
            return;
        }
        this.sound.playMismatch();
        setTimeout(() => {
            first.unflip();
            second.unflip();
            this.resetSelection();
            this.board.unlock();
        }, 800);
    }
    resetSelection() {
        this.state.firstCard = null;
        this.state.secondCard = null;
    }
    reset() {
        this.timer.reset();
        this.state.moves?.reset();
        this.state.score?.reset();
        this.resetSelection();
        this.board.reset();
        this.board.lock();
        this.button.reset();
        this.state.gameRunning = false;
    }
    getTimer() {
        return this.timer?.getTime() || "00:00";
    }
    checkWin() {
        const score = this.state.score?.getCount();
        const target = this.board.getNumberOfCards() / 2;
        if (score === target) {
            this.endGame();
        }
    }
    startGame() {
        this.state.gameRunning = true;
        this.board.unlock();
        this.timer.start();
        // this.sound.playBackground();
    }
    endGame() {
        this.timer.stop();
        this.sound.playWin();
        showWinPopup(this.state.moves?.getCount() || 0, this.timer.getTime() || "00:00");
        this.reset();
    }
    getBoard() {
        return this.board;
    }
    gameRunning() {
        return this.state.gameRunning;
    }
}
//# sourceMappingURL=GameEngine.js.map