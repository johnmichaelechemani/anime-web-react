import { useEffect, useState, useRef } from "react";
import "./styles/app.css";
import axios from "axios";
import bgImage from "../src/assets/kaido.jpg";
import RandomAnime from "./components/RandomAnime";
import Banner from "./components/Banner";
import TopAnimeComponent from "./components/TopAnime";
import Loading from "./components/Loading";
function App() {
  const [data, setData] = useState(null);
  const [topAnime, setTopAnime] = useState(null);
  const dataFetchedRef = useRef(false);
  const [activeCategory, setActiveCategory] = useState("Top 10");

  const endPointURlTopAnime = "https://api.jikan.moe/v4/top/anime";
  const endPointURlRandom = "https://api.jikan.moe/v4/random/anime";

  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const getData = async () => {
      const anime = {
        method: "GET",
        url: endPointURlRandom,
      };

      try {
        const response = await axios.request(anime);
        //console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    const getTopAnime = async () => {
      const anime = {
        method: "GET",
        url: endPointURlTopAnime,
      };

      try {
        const response = await axios.request(anime);
        setResponseData(response.data.data);
        setTopAnime(response.data.data);
        //console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
    getTopAnime();
  }, []);
  let navItem = [
    {
      id: 1,
      name: "Top 10",
      action: () => {
        setTopAnime(responseData.sort((a, b) => a.rank - b.rank));
        setActiveCategory("Top 10");
      },
    },
    {
      id: 2,
      name: "MOVIE",
      action: () => {
        setTopAnime(responseData.filter((anime) => anime.type === "Movie"));
        setActiveCategory("MOVIE");
      },
    },
    {
      id: 3,
      name: "SERIES",
      action: () => {
        setTopAnime(
          responseData.filter(
            (anime) => anime.type === "TV" || anime.type === "ONA"
          )
        );
        setActiveCategory("SERIES");
      },
    },
  ];

  return (
    <>
      <div className=" relative">
        {" "}
        <Banner bgImage={bgImage} />
        <div className=" flex justify-center sm:justify-start relative items-center sm:pl-8 pb-32 sm:pb-20">
          {data ? (
            <RandomAnime data={data} key={data.mal_id} />
          ) : (
            <>
              <Loading />
            </>
          )}
        </div>
        <div className="py-5 pt-20 sm:pt-10 flex justify-start px-8 items-center gap-3">
          {navItem.map((item) => {
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`btn btn-sm rounded-full px-6 ${
                  activeCategory === item.name
                    ? "btn-primary"
                    : "bg-transparent border border-gray-500/50"
                }`}
              >
                {" "}
                {item.name}
              </button>
            );
          })}
        </div>
        {topAnime ? (
          <TopAnimeComponent topAnime={topAnime} />
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>
    </>
  );
}
export default App;
