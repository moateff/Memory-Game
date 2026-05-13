export interface IBoardComponent {
	init(): void;
	
	getNumberOfCards(): number;
	
	addCard(image: string): void;
	
	shuffleCards(): void;
	reset(): void;

	isLocked(): boolean;
	lock(): void;
	unlock(): void;
}