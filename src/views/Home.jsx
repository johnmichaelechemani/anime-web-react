import { useEffect, useState, useRef } from "react";
import "../styles/app.css";
import axios from "axios";
import bgImage from "../assets/kaido.jpg";
import RandomAnime from "../components/RandomAnime";
import Banner from "../components/Banner";
import TopAnimeComponent from "../components/TopAnime";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

const Home = () => {
  const [data, setData] = useState(null);
  const [topAnime, setTopAnime] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dataFetchedRef = useRef(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const endPointURlTopAnime = "https://api.jikan.moe/v4/top/anime";
  const endPointURlRandom = "https://api.jikan.moe/v4/random/anime";

  const [responseData, setResponseData] = useState([]);

  const getTopAnime = async (page = 1) => {
    try {
      const response = await axios.get(`${endPointURlTopAnime}?page=${page}`);
      setResponseData(response.data.data);
      setTopAnime(response.data.data);
      setCurrentPage(response.data.pagination.current_page);
      setTotalPages(response.data.pagination.last_visible_page);
    } catch (error) {
      console.error(error);
    }
  };
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
    getData();
    getTopAnime();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    getTopAnime(page);
  };

  let navItem = [
    {
      id: 1,
      name: "All",
      action: () => {
        setTopAnime(responseData);
        setActiveCategory("All");
      },
    },
    {
      id: 2,
      name: "Top 10",
      action: () => {
        setCurrentPage(1);
        setTopAnime(
          [...responseData].sort((a, b) => a.rank - b.rank).slice(0, 10)
        );
        setActiveCategory("Top 10");
      },
    },
    {
      id: 3,
      name: "MOVIE",
      action: () => {
        setTopAnime(responseData.filter((anime) => anime.type === "Movie"));
        setActiveCategory("MOVIE");
      },
    },
    {
      id: 4,
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
          <div className="flex justify-start items-center gap-3 overflow-hidden overflow-x-scroll no-scrollbar">
            {navItem.map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`btn btn-sm rounded-full uppercase px-6 ${
                    activeCategory === item.name
                      ? "btn-primary text-sm "
                      : "bg-transparent text-xs border border-gray-500/50"
                  }`}
                >
                  {" "}
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
        {activeCategory === "Top 10" ? (
          <>
            <div className="flex text-3xl py-3 justify-start px-8 items-center">
              <h1>Top 10</h1>
            </div>
          </>
        ) : (
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        )}
        {topAnime ? (
          <>
            {" "}
            <TopAnimeComponent topAnime={topAnime} />
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>
    </>
  );
};
export default Home;
