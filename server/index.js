import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { usersRouter } from "./src/routes/users.js";
import { recipesRouter } from "./src/routes/recipes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", usersRouter);
app.use("/recipes", recipesRouter);

//connect database
mongoose.connect(
  "mongodb+srv://jloman200:jloman200@recipes.oixufqc.mongodb.net/?retryWrites=true&w=majority"
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
