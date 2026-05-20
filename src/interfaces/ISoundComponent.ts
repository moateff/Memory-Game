export interface ISoundComponent {
  init(): void;

  playBackground(): void;
  playFlip(): void;
  // playMatch(): void;
  playMismatch(): void;
  playWin(): void;
  // playLose(): void;
  
  toggle(): void;
}