import { useEffect, useState, useRef } from "react";
import "./styles/app.css";
import axios from "axios";
import bgImage from "../src/assets/kaido.jpg";
import RandomAnime from "./components/RandomAnime";
import Banner from "./components/Banner";
import RecommendationsComponent from "./components/Recommendations";
function App() {
  const [data, setData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const dataFetchedRef = useRef(false);

  const endPointURlRecommendations =
    "https://api.jikan.moe/v4/recommendations/anime";
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
    const getRecommendations = async () => {
      const anime = {
        method: "GET",
        url: endPointURlRecommendations,
      };

      try {
        const response = await axios.request(anime);
        const limitedRecommendations = response.data.data.slice(0, 5);
        setRecommendations(limitedRecommendations);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
    getRecommendations();
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
            <>Loading...</>
          )}
        </div>
        <div className="py-5 pt-20 sm:pt-10 flex justify-start px-8 items-center gap-3">
          <button className="btn btn-sm rounded-full text-gray-200 font-semibold btn-primary tracking-wide  px-6">
            Recommendations
          </button>
          <button className="btn btn-sm rounded-full bg-transparent border border-gray-500/50 px-6 ">
            Playlist
          </button>
        </div>
        <RecommendationsComponent recommendations={recommendations} />
      </div>
    </>
  );
}

export default App;
