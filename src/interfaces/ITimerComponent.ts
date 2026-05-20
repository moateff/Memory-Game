export interface ITimerComponent {
  start(): void;
  stop(): void;
  reset(): void;

  getTime(): string
}