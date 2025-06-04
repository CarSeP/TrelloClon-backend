import { Request, Response, Router } from "express";
import { addColumn, getColumnID } from "../services/column.services";
import { routerType } from "../interfaces/router.model";

export const columnRouter = Router();

columnRouter.post("/:id", async (req: Request, res: Response): routerType => {
	const { body } = req;
	const { id } = req.params;

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

	const columnID = await getColumnID(id);

	try {
		await addColumn(id, { id: columnID, title });
		return res.sendStatus(204);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
});
