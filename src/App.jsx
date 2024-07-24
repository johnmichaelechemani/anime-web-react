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

  const endPointURlTopAnime = "https://api.jikan.moe/v4/top/anime";
  const endPointURlRandom = "https://api.jikan.moe/v4/random/anime";

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
        console.log(response.data.data);
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

        const top10Anime = response.data.data
          .sort((a, b) => a.rank - b.rank) // Sort by rank
          .splice(0, 10); // Get top 10

        setTopAnime(top10Anime);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
    getTopAnime();
  }, []);

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
          <button className="btn btn-sm rounded-full text-gray-200 font-semibold btn-primary tracking-wide  px-6">
            Top 10 Anime
          </button>
          <button className="btn btn-sm rounded-full bg-transparent border border-gray-500/50 px-6 ">
            Playlist
          </button>
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
