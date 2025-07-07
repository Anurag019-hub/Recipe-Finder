import { useEffect, useState } from "react";
import axios from "axios";
import CircleFollower from "./Mouse";
import { useLocation } from "react-router-dom";
import FoodLoader from "./Loader";

export default function Search() {
  const [ans, setAns] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("query");
  const k = searchParams.get("sort") || "random";

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.post("/create", {
          recipe: q,
          sort: k,
        });
        setAns(res.data.results || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    if (q) getData();
  }, [q, k]);

  return (
    <>
      <CircleFollower />
      <div className="bg-[url(https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] min-h-screen bg-cover bg-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-x-hidden mt-20">
          {ans.length > 0 ? (
            ans.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-lg">
                <a href={`/recipe/${item.id}`} className="cursor-default block">
                  <h1 className="text-lg font-bold mb-2 truncate">{item.title}</h1>
                  <img
                    src={item.image}
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
          ) : (
           <FoodLoader/>
          )}
        </div>
      </div>
    </>
  );
}
