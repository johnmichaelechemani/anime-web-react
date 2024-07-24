import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify-icon/react";
export default function Search() {
  const modalRef = useRef(null);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const endPointURlSearch = "https://api.jikan.moe/v4/anime?q=";
  const defaultSearch = "https://api.jikan.moe/v4/anime";
  let URL = "";
  if (search !== "") {
    URL = endPointURlSearch + search;
  } else {
    URL = defaultSearch;
  }

  const openModalClickSearch = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  useEffect(() => {
    const getDataSearch = async () => {
      const anime = {
        method: "GET",
        url: URL, // dynamic url based on user activity
      };

      try {
        const response = await axios.request(anime);
        console.log(response.data.data);
        setSearchData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getDataSearch();
  }, [URL]);

  console.log("search", searchData);

  const handleModalClickSearch = () => {
    console.log(search.toLowerCase());
  };
  return (
    <>
      <div className="absolute top-3 left-5  z-10">
        <button
          className="btn bg-transparent border border-none hover:bg-transparent cursor-pointer"
          onClick={openModalClickSearch}
        >
          {" "}
          <input
            type="search"
            placeholder="Search.."
            readOnly
            className="input cur input-bordered bg-transparent rounded-full w-full max-w-lg"
          />
        </button>
      </div>
      <div>
        <dialog id="searchModal" className="modal" ref={modalRef}>
          <div className="modal-box bg-gray-800/50 text-gray-200 border border-gray-500/50 backdrop-blur-xl">
            <h3 className="text-2xl font-bold pb-3">Search Anime</h3>
            <div className="flex justify-start items-center gap-2">
              <input
                type="search"
                placeholder="Search.."
                onChange={(e) => {
                  setSearch(e.target.value.toLowerCase());
                }}
                className="input cur input-bordered bg-transparent rounded-full w-full max-w-lg"
              />
              <button
                disabled={search === ""}
                className="btn btn-primary"
                onClick={handleModalClickSearch}
              >
                Search
              </button>
            </div>

            <div>
              <div className="pt-5">
                {search ? <h1>Result:</h1> : <>Recommendations:</>}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 py-3 gap-y-2">
                {searchData && searchData.length > 0 ? (
                  searchData.map((anime) => (
                    <div
                      key={anime.mal_id}
                      className="flex justify-center sm:justify-start gap-2 items-center"
                    >
                      <div className="rounded-xl border border-cyan-500/50 overflow-hidden">
                        <div className="w-52 relative h-52">
                          <img
                            src={anime.images.jpg.image_url}
                            className="object-cover object-center h-full w-full"
                          />

                          <div className="absolute text-gray-200 left-0 z-10 bottom-0">
                            <p className="text-xs sm:text-sm p-2 font-extrabold backdrop-blur-[1px]">
                              {anime.title}
                            </p>
                            <div className="flex text-sm justify-start items-center">
                              <span className="gap-1 flex justify-start items-center bg-gray-500/20 rounded-md px-1 m-1">
                                <Icon
                                  icon="mdi:cc-outline"
                                  className="text-xl"
                                />
                                {anime.episodes}
                              </span>
                              <span className="text-primary">{anime.type}</span>
                            </div>
                          </div>
                          <div className="pointer-events-none rounded-xl absolute inset-x-0 bottom-0 w-full h-[70%] bg-gradient-to-t from-base-100"></div>
                          <div className="pointer-events-none absolute rounded-xl inset-y-0 left-0 w-1/3 bg-gradient-to-r from-base-100/80"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <> {search ? <div>No results found</div> : <></>}</>
                )}
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
}
