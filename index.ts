import express from "express";
import { boardRouter } from "./src/routes/board.route";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/board", boardRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
