import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import CircleFollower from "./Mouse";

export default function IngredientDetails() {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    (async function fetchRecipeDetails() {
      try {
        const res = await axios.get(`/created/ingredents/${id}`);
        const data = res.data;

        setIngredients(data.extendedIngredients);
        setImage(data.image);
        setTitle(data.title);
      } catch (error) {
        console.error("Error fetching recipe info:", error.message);
      }
    })();
  }, [id]);

  return (
    <>
    <CircleFollower/>
    <div className="min-h-screen bg-[url(https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat flex items-center justify-center p-8 ">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row not-md:mt-20">

        <div className="md:w-1/2 w-full h-80 md:h-auto">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="md:w-1/2 w-full p-6">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside space-y-1">
            {ingredients.map((item, index) => (
              <li key={index}>{item.original}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
