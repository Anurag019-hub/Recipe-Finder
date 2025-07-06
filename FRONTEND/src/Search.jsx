import { useEffect, useState } from "react";
import axios from "axios";
import CircleFollower from "./Mouse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";


export default function Search() {
  const [recipe, setRecipe] = useState("");
  const [sort,setSort] = useState("random");
  const [ans, setAns] = useState([]);
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get("query");
    const k = searchParams.get("sort")


useEffect(()=>{
  getData();
},[q,k])


  async function getData() {
    console.log(q);
    setRecipe(q);
    try {
      const res = await axios.post("/create", { recipe,sort });
      setAns(res.data.results);
    } catch (err) {
      console.error("Error:", err);
    }
  }


  return (
    <>
    <CircleFollower/>
    <div className="bg-[url(https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] min-h-screen ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-x-hidden mt-20">

          {ans.map((item) => (

            <div key={item.id} className="bg-white rounded-xl p-4 shadow-lg" >
             

              <a href={`/created/ingredents/${item.id}`} className="cursor-default">
                <h1 className="text-lg font-bold mb-2">{item.title}</h1>
                <img src={item.image} alt={item.title} className="w-full rounded-lg" />

              </a>
            </div>

          ))}
        </div>
      </div>


    </>
  );
}
