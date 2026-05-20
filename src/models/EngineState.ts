import { GameCard } from "../components/GameCard.js";
import { GameCounter } from "../components/GameCounter.js";

export interface EngineState {
  firstCard: GameCard | null;
  secondCard: GameCard | null;
  
  moves: GameCounter | null;
  score: GameCounter | null;

  gameRunning: boolean
}