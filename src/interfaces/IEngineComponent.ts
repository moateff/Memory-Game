import { GameCard } from "../components/GameCard.js";

export interface IEngineComponent {
  selectCard(card: GameCard): void
}