export class GameSound {
    // private loseAudio!: HTMLAudioElement;
    constructor() {
        this.state = {
            backgroundAudio: "./assets/sounds/background.mp3",
            flipAudio: "./assets/sounds/flip.mp3",
            // matchAudio: "./assets/sounds/match.mp3",
            mismatchAudio: "./assets/sounds/mismatch.mp3",
            winAudio: "./assets/sounds/win.mp3",
            // loseAudio: "./assets/sounds/lose.mp3",
            enabled: true
        };
    }
    init() {
        this.backgroundAudio = new Audio(this.state.backgroundAudio);
        this.flipAudio = new Audio(this.state.flipAudio);
        // this.matchAudio = new Audio(this.state.matchAudio);
        this.mismatchAudio = new Audio(this.state.mismatchAudio);
        this.winAudio = new Audio(this.state.winAudio);
        // this.loseAudio = new Audio(this.state.loseAudio);
    }
    toggle() {
        this.state.enabled = !this.state.enabled;
    }
    playBackground() {
        if (this.state.enabled) {
            this.backgroundAudio.currentTime = 0;
            this.backgroundAudio.loop = true;
            this.backgroundAudio.play();
        }
    }
    playFlip() {
        if (this.state.enabled) {
            this.flipAudio.currentTime = 0;
            this.flipAudio.play();
        }
    }
    // playMatch(): void {
    //   if (this.state.enabled) {
    //     this.matchAudio.currentTime = 0;
    //     this.matchAudio.play();
    //   }
    // }
    playMismatch() {
        if (this.state.enabled) {
            this.mismatchAudio.currentTime = 0;
            this.mismatchAudio.play();
        }
    }
    playWin() {
        if (this.state.enabled) {
            this.winAudio.currentTime = 0;
            this.winAudio.play();
        }
    }
}
//# sourceMappingURL=GameSound.js.map