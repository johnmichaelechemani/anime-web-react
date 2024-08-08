import { useRef, useState, useEffect, Suspense } from "react";
import axios from "axios";
import CardMain from "./CardMain";
import ModalMain from "./ModalMain";
import Loading from "./Loading";
export default function Search() {
  const modalRef = useRef(null);
  const modalRefAnimeInfo = useRef(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const endPointURlSearch = "https://api.jikan.moe/v4/anime?q=";
  const defaultSearch = "https://api.jikan.moe/v4/anime";
  let URL = "";

  if (debouncedSearch !== "") {
    URL = endPointURlSearch + debouncedSearch;
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
        // console.log(response.data.data);
        setSearchData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getDataSearch();
  }, [URL]);

  // add debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      console.log("loading...");
    }, 300);

    // Cleanup timeout if the effect is called again before 300ms
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // console.log("search", searchData);

  const handleModalClickSearch = () => {
    // console.log(search.toLowerCase());
  };

  const handleTopAnimeModal = (anime) => {
    setSelectedItem(anime);
    setIsModalOpen(true);
    if (modalRefAnimeInfo.current) {
      modalRefAnimeInfo.current.showModal();
    }
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
                className="input input-bordered bg-transparent rounded-full w-full max-w-lg"
              />
              <button
                className={` ${search === "" ? "hidden" : ""} btn btn-primary`}
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
                <Suspense fallback={<Loading />}>
                  {searchData && searchData.length > 0
                    ? searchData.map((anime) => (
                        <CardMain
                          key={anime.mal_id}
                          src={anime.images.jpg.image_url}
                          animeTitle={anime.title}
                          episodes={anime.episodes}
                          type={anime.type}
                          onClick={() => handleTopAnimeModal(anime)}
                        />
                      ))
                    : search && <div>No results found</div>}
                </Suspense>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      {/* modal */}
      {selectedItem && (
        <div>
          <ModalMain
            ref={modalRefAnimeInfo}
            data={selectedItem}
            onClose={() => setIsModalOpen(false)}
            isModalOpen={isModalOpen}
          />
        </div>
      )}
    </>
  );
}
