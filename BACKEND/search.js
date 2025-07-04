import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/create", async (req, res) => {
  const recipe = req.body.recipe;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          apiKey: process.env.API_KEY,
          query: recipe,
          number: 12
        },
      }
    );

    res.json(response.data); // send results directly
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});


app.post("/best", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          apiKey: process.env.API_KEY,
          number: 12,
          sort: "popularity",  // valid here
          addRecipeInformation: true, // to get full image/title
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});



app.get("/created/ingredents/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      params: {
        apiKey: process.env.API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch recipe information" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
