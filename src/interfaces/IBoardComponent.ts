export interface IBoardComponent {
	init(): void;

	addCard(image: string): void;
	getNumberOfCards(): number;

	shuffleCards(): void;
	reset(): void;

	isLocked(): boolean;
	lock(): void;
	unlock(): void;
}