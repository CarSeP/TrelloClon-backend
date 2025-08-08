import { routerType } from "./../interfaces/router.model";
import { Response, Request, Router } from "express";
import { generateID } from "../services/id.services";
import { prisma } from "../services/prisma.services";

export const boardRouter = Router();

boardRouter.get("/", async (req: Request, res: Response): routerType => {
	const boards = await prisma.board.findMany()
	return res.status(200).json(boards)
});

boardRouter.get("/:id", async (req: Request, res: Response): routerType => {
	const { id } = req.params;

	const board = await prisma.board.findUnique({
		where: {
			id
		}
	})

	if (!board) {
		return res.status(404).json({
			message: "Board not found"
		})
	}

	return res.status(200).json(board)

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

	const user = await prisma.board.create({
		data: {
			id: generateID(8),
			title,
			usersID: [userID]
		}
	})

	res.status(201).json(user)

});

boardRouter.delete("/:id", async (req: Request, res: Response): routerType => {
	const { id } = req.params;

	const existBoard = await prisma.board.findUnique({
		where: {
			id
		}
	})

	if (!existBoard) {
		return res.status(404).json({
			message: "Board not found"
		})
	}

	const board = await prisma.board.delete({
		where: {
			id
		}
	})

	res.status(200).json(board)

});

boardRouter.patch("/:id", async (req: Request, res: Response): routerType => {
	const { id } = req.params;
	const { body } = req;

	if (!body) {
		return res.status(400).json({
			error: "Body not provided",
		});
	}

	const existBoard = await prisma.board.findUnique({
		where: {
			id
		}
	})

	if (!existBoard) {
		return res.status(404).json({
			message: "Board not found"
		})
	}

	const data: any = {};
	const { title, usersID } = body;

	if (title !== undefined) data.title = title;
	if (usersID !== undefined) data.usersID = usersID;

	const board = await prisma.board.update({
		where: {
			id
		},
		data: data
	})


	res.status(200).json(board)
});
