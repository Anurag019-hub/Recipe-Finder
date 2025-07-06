import { useEffect, useState } from "react"
import axios from "axios";
import CircleFollower from "./Mouse";

export default function Bestrecipe() {

    const [ans, setAns] = useState([]);
    const [liked, setliked] = useState(false);
    useEffect(() => {
        async function getData() {

            try {
                const res = await axios.post("/best");
                setAns(res.data.results);
            } catch (err) {
                console.error("Error:", err);
            }
        }
        getData()
    }, [])
    return (<>
        <CircleFollower/>
        <div className=" bg-[url(https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] min-h-screen ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-x-hidden pt-30">


                {ans.map((item) => (

                    <div key={item.id} className="bg-white rounded-xl p-4 shadow-lg" >
                        {/* <div className={`group w-12 h-12 flex items-center justify-center rounded-full ${liked?"bg-white":"bg-red-500"}  shadow-md transition`}> */}
                        {/* <FontAwesomeIcon icon={faHeart} className={` text-xl group-hover:scale-110 transition-transform ${liked?"text-red-600":"text-white"}` } onClick={()=>{setliked((prev)=>!prev)}}/> */}
                        {/* </div> */}

                        <a href={`/created/ingredents/${item.id}`} className="cursor-default">
                            <h1 className="text-lg font-bold mb-2">{item.title}</h1>
                            <img src={item.image} alt={item.title} className="w-full rounded-lg" />

                        </a>
                    </div>

                ))}
            </div>
        </div>
    </>)
} 