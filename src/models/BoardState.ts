import { GameCard } from "../components/GameCard.js";

export interface BoardState {
  cards: GameCard[];
  locked: boolean;
}