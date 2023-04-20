import express from "express";
import Recipe from "../models/Recipes.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

router.post("/", async (req, res) => {
  try {
    const { name, description, ingredients, instructions, image } = req.body;
    const newRecipe = new Recipe({
      name,
      description,
      ingredients,
      instructions,
      image
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as recipesRouter };
