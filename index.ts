import express from "express";
import cors from "cors";
import { boardRouter } from "./src/routes/board.route";
import { initMongoose } from "./src/services/mongoose.services";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/board", boardRouter);

initMongoose();

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
