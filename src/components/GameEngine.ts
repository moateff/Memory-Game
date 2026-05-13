import { IEngineComponent } from "../interfaces/IEngineComponent.js";
import { EngineState } from "../models/EngineState.js";
import { GameBoard } from "./GameBoard.js";
import { GameCard } from "./GameCard.js";
import { GameCounter } from "./GameCounter.js";
import { GameSound } from "./GameSound.js";
import { GameTimer } from "./GameTimer.js";

export class GameEngine implements IEngineComponent {

  private board: GameBoard;
  private sound: GameSound;
  private timer: GameTimer;

  private state: EngineState;

  constructor() {

    this.board = document.querySelector("#board") as GameBoard;

    this.timer = document.querySelector("#timer") as GameTimer;

    const moves = document.querySelector("#moves") as GameCounter;

    const score = document.querySelector("#score") as GameCounter;

    this.sound = new GameSound();

    this.state = {
      firstCard: null,
      secondCard: null,
      moves,
      score
    };

    this.board.setEngine(this);
  }

  init(): void {
    this.board.init();
    this.sound.init();

    this.timer.start();

    document.addEventListener("click", () => {
        this.sound.playBackground();
      }, { once: true }
    );
  }

  selectCard(card: GameCard): void {

    if (this.board.isLocked()) return;

    if (!card) return;

    if (card.isMatched()) return;

    if (card.isFlipped()) return;

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

  checkMatch(): void {

    const first = this.state.firstCard;
    const second = this.state.secondCard;
    
    if (!first || !second) return;

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

  resetSelection(): void {

    this.state.firstCard = null;
    
    this.state.secondCard = null;
  }

  reset(): void {

    this.timer.reset();

    this.state.moves?.reset();

    this.state.score?.reset();

    this.resetSelection();

    this.board.reset();

    this.timer.start();
  }

  getTimer(): string {
    return this.timer?.getTime() || "00:00";
  }

  checkWin(): void {

    const score = this.state.score?.getCount();

    const target = this.board.getNumberOfCards() / 2;

    if (score === target - 1) {
      this.endGame();
    }
  }

  endGame(): void {

    this.timer.stop();

    this.sound.playWin();

    alert(`🎉 You Won!\nMoves: ${this.state.moves?.getCount()}\nTime: ${this.timer.getTime()}`);

    this.reset();
  }

  getBoard(): GameBoard {
    return this.board;
  }

}
