import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT||3000;
const apiKey = process.env.API_KEY;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/create", async (req, res) => {
  const recipe = req.body.recipe;
  const sort = req.body.sort

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          apiKey,
          query: recipe,
          number: 12,
          sort
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
          apiKey,
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
    let response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      params: {
        apiKey,
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch recipe information" });
  }
});
app.get("/similar/ingredents/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    let response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/similar`, {
      params: {
        apiKey,
        number:3
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch recipe information" });
  }
});
app.get("/summery/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    let response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/summary`, {
      params: {
        apiKey,
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch recipe information" });
  }
});
app.get("/taste/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    let response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/tasteWidget.json`, {
      params: {
        apiKey,
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch recipe information" });
  }
});

app.listen(port, () => {
  console.log("Server running on http://localhost:3000");
});
