import { useEffect, useState, useRef } from "react";
import "./styles/app.css";
import axios from "axios";
import bgImage from "../src/assets/kaido.jpg";
function App() {
  const [data, setData] = useState(null);
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const getData = async () => {
      const anime = {
        method: "GET",
        url: "https://api.jikan.moe/v4/random/anime",
      };

      try {
        const response = await axios.request(anime);
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="sm:m-10 relative">
        {" "}
        <div className="pt-3 px-3">
          <input
            type="search"
            placeholder="Search.."
            className="input input-bordered rounded-full w-full max-w-lg"
          />
        </div>
        <div className="relative py-5">
          <div className="h-52 sm:h-60 md:h-96 relative py-2">
            <img
              src={bgImage}
              alt=""
              className="object-cover object-center h-full w-full"
            />
            <h1 className="absolute text-gray-200 top-10 left-2 px-5  sm:px-0 sm:left-0 text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold z-10  drop-shadow-[0,0,0,0,8]">
              Watch anytime, anywhere.
            </h1>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[80%] backdrop-blur-[2px] bg-gradient-to-r from-base-100"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-1/4 bg-gradient-to-t from-base-100"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-base-100"></div>
            <div className="pointer-events-none absolute inset-x-0 top-0 w-full h-1/4 bg-gradient-to-b from-base-100"></div>
          </div>
        </div>
        <div className=" flex justify-center sm:justify-start relative items-center pb-32 sm:pb-20">
          <div className="absolute -top-10 sm:-top-32 z-10">
            {data ? (
              <div
                className=" rounded-xl border border-gray-400/50 overflow-hidden"
                key={data.mal_id}
              >
                <div className="w-52 relative h-52 ">
                  <img
                    src={data.images.jpg.image_url}
                    alt={data.title}
                    className="object-cover object-center h-full w-full"
                  />
                  <h2 className="absolute text-gray-200 text-sm p-2 font-extrabold left-0 z-10 bottom-0 backdrop-blur-[1px]">
                    {data.title}
                  </h2>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-[70%] bg-gradient-to-t from-base-100"></div>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="py-5 pt-20 sm:pt-10 flex justify-start px-5 sm:px-0 items-center gap-3">
          <button className="btn btn-sm rounded-full text-gray-200 font-semibold btn-primary tracking-wide  px-6">
            All
          </button>
          <button className="btn btn-sm rounded-full bg-transparent border border-gray-500/50 px-6 ">
            Playlist
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
