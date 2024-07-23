import { useEffect, useState, useRef } from "react";
import "./styles/app.css";
import axios from "axios";
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
      <div className="m-10">
        {" "}
        <input
          type="search"
          placeholder="Search.."
          className="input input-bordered rounded-full w-full max-w-xs"
        />
        <h1 className="text-5xl md:text-7xl py-5">Watch anytime, anyware.</h1>
        <div>
          {data ? (
            <div className="" key={data.mal_id}>
              <div className="w-full h-52 overflow-hidden">
                <img
                  src={data.images.jpg.image_url}
                  alt={data.title}
                  className="cover"
                />
              </div>
              <h2>{data.title}</h2>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="py-5 flex justify-start items-center gap-3">
          <button className="btn btn-sm rounded-full btn-primary px-6">
            All
          </button>
          <button className="btn btn-sm rounded-full ">Playlist</button>
          <button className="btn btn-sm rounded-full ">New</button>
          <button className="btn btn-sm rounded-full ">Small</button>
        </div>
      </div>
    </>
  );
}

export default App;
