import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import CircleFollower from "./Mouse";

export default function IngredientDetails() {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [summery,setSummery] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    (async function fetchRecipeDetails() {
      try {
        const res = await axios.get(`http://localhost:3000/created/ingredents/${id}`);
        const data = res.data;

        setIngredients(data.extendedIngredients);
        setImage(data.image);
        setTitle(data.title);
      } catch (error) {
        console.error("Error fetching recipe info:", error.message);
      }
    })();

    (async function similar() {
      try {
        const res = await axios.get(`http://localhost:3000/similar/ingredents/${id}`);
        const data = res.data;

        setSimilar(data);
      } catch (error) {
        console.error("Error fetching recipe info:", error.message);
      }
    }

    )()
  }, [id]);
 
  async function handlefetch() {
    try{
      const res =  await axios.get(`http://localhost:3000/summery/${id}`);
        const data = res.data;
      setSummery(data.summary);
    }catch(error){
      console.error(`ERROR fetching ${info}`,error.message )
    }
  }


  return (
    <>
      <CircleFollower />
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
            <div className="flex flex-col md:flex-row gap-5 justify-around mt-10">
              <button className="bg-red-600 h-10 w-40 rounded-full font-bold text-white transition-all duration-300 ease-in-out hover:text-red-600 hover:bg-white shadow-md hover:shadow-lg tracking-wide"  onClick={(e)=>{ e.preventDefault();handlefetch()}}>
               Nutrition
              </button>
             </div>
            </div>
            
          </div>
         
        </div>
        {summery.length > 0 && (
  <div className="bg-[url(https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex justify-center">
    <div className="bg-white/40 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-xl flex flex-col md:flex-row not-md:mt-20 m-10">
      <div className="md:w-full p-6">
        <h3 className="text-3xl font-bold mb-4 text-black">Nutrition Summary:</h3>
        <div
          className=" max-w-none text-black"
          dangerouslySetInnerHTML={{ __html: summery }}
        />
      </div>
    </div>
  </div>
)}

        {
          similar.length > 0 &&
          <div className=" w-full  overflow-x-hidden bg-[url(https://plus.unsplash.com/premium_photo-1671377387797-8d3307a546a6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover">
            <div className=" bg-white/50 h-full ">
              <div className="pt-20">
                <h1 className="font-anton text-center text-6xl text-stone-950 ">SIMILAR RECIPES</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-x-hidden mt-20">
                {
                  similar.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl p-4 shadow-lg">
                      <a href={`/recipe/${item.id}`} className="cursor-default block">
                        <h1 className="text-lg font-bold mb-2 truncate">{item.title}</h1>
                        <img
                          src={`https://spoonacular.com/recipeImages/${item.id}-556x370.jpg`}
                          alt={item.title}
                          className="w-full rounded-lg object-cover aspect-square"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
                          }}
                        />
                      </a>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        }
      </>
      );
}
