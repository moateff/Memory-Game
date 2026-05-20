import { IEngineComponent } from "../interfaces/IEngineComponent.js";
import { EngineState } from "../models/EngineState.js";
import { GameBoard } from "./GameBoard.js";
import { GameButton } from "./GameButton.js";
import { GameCard } from "./GameCard.js";
import { GameCounter } from "./GameCounter.js";
import { GameSound } from "./GameSound.js";
import { GameTimer } from "./GameTimer.js";
import { showWinPopup } from "../popup.js"

export class GameEngine implements IEngineComponent {

  private board: GameBoard;
  private sound: GameSound;
  private timer: GameTimer;
  private button: GameButton;

  private state: EngineState;

  constructor() {

    this.board = document.querySelector("#board") as GameBoard;

    this.timer = document.querySelector("#timer") as GameTimer;

    const moves = document.querySelector("#moves") as GameCounter;

    const score = document.querySelector("#score") as GameCounter;

    this.button = document.querySelector("#start-btn") as GameButton;

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

  init(): void {
    this.board.init();
    this.board.lock();
    this.sound.init();
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
    this.board.lock();

    this.button.reset();

    this.state.gameRunning = false;
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

  startGame(): void {

    this.state.gameRunning = true;

    this.board.unlock();

    this.timer.start();

    // this.sound.playBackground();
  }

  endGame(): void {

    this.timer.stop();

    this.sound.playWin();

    showWinPopup(
      this.state.score?.getCount() || 0,
      this.state.moves?.getCount() || 0,
      this.timer.getTime() || "00:00");

    this.reset();
  }

  getBoard(): GameBoard {
    return this.board;
  }

  gameRunning(): boolean {
    return this.state.gameRunning;
  }
}

