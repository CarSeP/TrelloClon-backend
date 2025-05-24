import { Router } from "express";
import { BoardType } from "../interfaces/board.model";
import { generateID } from "../services/id.services";

export const boardRouter = Router();

let boards: BoardType[] = [];

boardRouter.get("/", (req, res): any => {
	return res.json(boards);
});

boardRouter.get("/:id", (req, res): any => {
	const { id } = req.params;

	const board = boards.find((el) => el.id === id);

	if (!board) {
		return res.status(404).json({
			message: `Board with id '${id}' does not exist`,
		});
	}

	return res.json(board);
});

boardRouter.post("/", (req, res): any => {
	const { body } = req;

	if (!body) {
		return res.status(400).json({
			error: "Body not provided",
		});
	}

	const { title } = body;

	if (!title) {
		return res.status(400).json({
			error: "Title not provided",
		});
	}

	const newBoard = {
		id: generateID(7),
		columns: [],
		title,
	};

	boards.push(newBoard);

	return res.json(newBoard);
});

boardRouter.delete("/:id", (req, res): any => {
	const { id } = req.params;

	const deletedBoard = boards.find((el) => el.id === id);

	if (!deletedBoard) {
		return res.status(404).json({
			message: `Board with id '${id}' does not exist`,
		});
	}

	boards = boards.filter((el) => el.id !== id);

	return res.json(deletedBoard);
});

boardRouter.patch("/:id", (req, res): any => {
	const { id } = req.params;
	const { body } = req;

	if (!body) {
		return res.status(400).json({
			error: "Body not provided",
		});
	}

	let updatedBoard = boards.find((el) => el.id === id);

	if (!updatedBoard) {
		return res.status(404).json({
			message: `Board with id '${id}' does not exist`,
		});
	}

	updatedBoard.title = body.title || updatedBoard.title;

	boards = boards.map((el) => {
		if (el.id === id) {
			el = updatedBoard;
		}
		return el;
	});

	return res.json(updatedBoard);
});
