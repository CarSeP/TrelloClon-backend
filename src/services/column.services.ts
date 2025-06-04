import { ColumnType } from "../interfaces/board.model";
import { Board } from "../schemas/board.schema";
import { getMaxID } from "./id.services";

export const getColumnID = async (boardID: string) => {
	try {
		const board = await Board.findOne({ id: boardID }, { columns: 1 });
		return getMaxID(board!.columns) + 1;
	} catch {
		throw new Error("Server error");
	}
};

export const addColumn = async (id: string, column: ColumnType) => {
	try {
		return await Board.findOneAndUpdate({ id }, { $push: { columns: column } });
	} catch (e) {
		throw new Error("Server error");
	}
};
