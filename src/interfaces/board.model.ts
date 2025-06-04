export interface BoardType {
	id: string;
	title: string;
	usersID: string[];
	columns?: ColumnType[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ColumnType {
	id: number;
	title: string;
	cards?: CardType[];
}

export interface CardType {
	id: number;
	title: string;
	description: string;
	createdAt: {
		date: Date;
		userID: string;
	};
	updatedAt?: [
		{
			userID: string;
			date: Date;
			change: "description" | "title" | "status" | "column";
			value: {
				oldValue: string;
				newValue: string;
			};
		},
	];
}
