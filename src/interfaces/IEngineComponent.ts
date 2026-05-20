import { GameCard } from "../components/GameCard.js";

export interface IEngineComponent {
  init(): void

  selectCard(card: GameCard): void
  checkMatch(): void
  resetSelection(): void

  checkWin(): void

  startGame(): void
  endGame(): void
  
  reset(): void
}