import mongoose from "mongoose";
import { BoardType } from "../interfaces/board.model";

const boardSchema = new mongoose.Schema({
	id: {
		type: String,
		require: true,
	},
	title: {
		type: String,
		require: true,
		maxlength: 30,
	},
});

export const Board = mongoose.model("board", boardSchema);

export const getBoards = async () => {
	try {
		return await Board.find(
			{},
			{
				_id: 0,
				__v: 0,
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
