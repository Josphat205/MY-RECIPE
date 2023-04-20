import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    ingredients: [String],
    instructions: [String],
    image: String
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
