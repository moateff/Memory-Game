export interface ICardComponent {
  cardId: string;

  getImage(): string;

  flip(): void;
  unflip(): void;

  lock(): void;
  unlock(): void;

  setMatched(): void;

  isFlipped(): boolean;
  isMatched(): boolean;
  isLocked(): boolean;

  reset(): void;
}