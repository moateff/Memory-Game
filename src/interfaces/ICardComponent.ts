export interface ICardComponent {
  id: string;

  updateView(): void;

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