import { Board } from "../schemas/board.schema";
import { BoardType } from "../interfaces/board.model";

export const getBoards = async () => {
	try {
		return await Board.find(
			{},
			{
				id: 1,
				title: 1,
				usersID: 1,
				_id: 0,
			}
		);
	} catch {
		throw new Error("Server error");
	}
};

export const getBoard = async (id: string) => {
	try {
		return await Board.findOne(
			{
				id: id,
			},
			{
				_id: 0,
				__v: 0,
			}
		);
	} catch {
		throw new Error("Server error");
	}
};

export const addBoard = async (board: BoardType) => {
	const newBoard = new Board(board);
	try {
		await newBoard.save();
		return board;
	} catch {
		throw new Error("Server error");
	}
};

export const deleteBoard = async (id: string) => {
	try {
		return await Board.findOneAndDelete({ id: id });
	} catch {
		throw new Error("Server error");
	}
};

export const updateBoard = async (board: BoardType) => {
	try {
		return await Board.findOneAndUpdate({ id: board.id }, { $set: board });
	} catch {
		throw new Error("Server error");
	}
};
