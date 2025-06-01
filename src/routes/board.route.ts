import { routerType } from "./../interfaces/router.model";
import { Response, Request, Router } from "express";
import { generateID } from "../services/id.services";
import {
	addBoard,
	deleteBoard,
	getBoard,
	getBoards,
	updateBoard,
} from "../services/board.services";

export const boardRouter = Router();

boardRouter.get("/", async (req: Request, res: Response): routerType => {
	try {
		const boards = await getBoards();
		return res.json(boards);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
});

boardRouter.get("/:id", async (req: Request, res: Response): routerType => {
	const { id } = req.params;

	try {
		const board = await getBoard(id);
		if (!board) {
			return res.status(404).json({
				message: `Board with id '${id}' does not exist`,
			});
		}

		return res.json(board);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
});

boardRouter.post("/", async (req: Request, res: Response): routerType => {
	const { body } = req;

	if (!body) {
		return res.status(400).json({
			error: "Body not provided",
		});
	}

	const { title, userID } = body;

	if (!title) {
		return res.status(400).json({
			error: "Title not provided",
		});
	}

	if (!userID) {
		return res.status(400).json({
			error: "UserID not provided",
		});
	}

	try {
		await addBoard({ id: generateID(7), title, usersID: [userID] });
		return res.sendStatus(204);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
});

boardRouter.delete("/:id", async (req: Request, res: Response): routerType => {
	const { id } = req.params;

	try {
		const board = await deleteBoard(id);
		if (!board) {
			return res.status(404).json({
				message: `Board with id '${id}' does not exist`,
			});
		}

		return res.sendStatus(204);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
});

boardRouter.patch("/:id", async (req: Request, res: Response): routerType => {
	const { id } = req.params;
	const { body } = req;

	if (!body) {
		return res.status(400).json({
			error: "Body not provided",
		});
	}

	delete body.columns;
	delete body.createdAt;
	delete body.updatedAt;

	try {
		const board = await updateBoard({ ...body, id });
		if (!board) {
			return res.status(404).json({
				message: `Board with id '${id}' does not exist`,
			});
		}

		return res.sendStatus(204);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
});
