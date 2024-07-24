import PropTypes from "prop-types";
import { Icon } from "@iconify-icon/react";
import { useRef, useState } from "react";
export default function TopAnimeComponent({ topAnime }) {
  const modalTopAnimeRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(topAnime);
  const [selectedItem, setSelectedItem] = useState([]);

  const handleTopAnimeModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    console.log(item);
    if (modalTopAnimeRef.current) {
      modalTopAnimeRef.current.showModal();
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-2 px-8 pb-5">
        {topAnime.map((item) => (
          <div
            key={item.mal_id}
            className="flex justify-center sm:justify-start gap-2 items-center"
            onClick={() => handleTopAnimeModal(item)}
          >
            <div className="rounded-xl border border-cyan-500/50 overflow-hidden">
              <div className="w-52 relative h-52">
                <img
                  src={item.images.jpg.image_url}
                  className="object-cover object-center h-full w-full"
                />
                <div className="absolute top-0 text-gray-200 drop-shadow-2xl left-0 z-10 text-5xl md:text-6xl">
                  <span>{item.rank}</span>
                </div>
                <div className="absolute text-gray-200 left-0 z-10 bottom-0">
                  <p className="text-xs sm:text-sm p-2 font-extrabold backdrop-blur-[1px]">
                    {item.title}
                  </p>
                  <div className="flex text-sm justify-start items-center">
                    <span className="gap-1 flex justify-start items-center bg-gray-500/20 rounded-md px-1 m-1">
                      <Icon icon="mdi:cc-outline" className="text-xl" />
                      {item.episodes}
                    </span>
                    <span>{item.type}</span>
                  </div>
                </div>
                <div className="pointer-events-none rounded-xl absolute inset-x-0 bottom-0 w-full h-[70%] bg-gradient-to-t from-base-100"></div>
                <div className="pointer-events-none absolute rounded-xl inset-y-0 left-0 w-1/3 bg-gradient-to-r from-base-100/80"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* modal */}
      {selectedItem && (
        <div>
          <dialog
            id="modalTopAnime"
            className="modal "
            ref={modalTopAnimeRef}
            onClose={() => setIsModalOpen(false)}
          >
            <div className="modal-box bg-gray-800/50 text-gray-200 border border-gray-500/50 backdrop-blur-xl">
              <div>
                {selectedItem &&
                selectedItem.trailer &&
                selectedItem.trailer.youtube_id &&
                isModalOpen ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={selectedItem.trailer.embed_url}
                    title={`${selectedItem.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <></>
                )}
              </div>
              <h3 className="text-3xl py-3 font-bold">{selectedItem.title}</h3>
              <div className="flex justify-start items-center gap-2">
                <div className="bg-primary/10 rounded-md  p-1 flex justify-center items-center gap-1">
                  <Icon icon="game-icons:rank-2" className="text-xl" />{" "}
                  {selectedItem.rank}
                </div>
                <div className="bg-primary/10 rounded-md  p-1 flex justify-center items-center gap-1">
                  <Icon icon="mdi:cc-outline" className="text-xl" />{" "}
                  {selectedItem.episodes}
                </div>
                <div className="bg-primary/10 rounded-md  p-1 flex justify-center items-center gap-1">
                  <Icon
                    icon="material-symbols-light:sports-score"
                    className="text-xl"
                  />
                  {selectedItem.score}
                </div>
                <div className="bg-primary/10 rounded-md  p-1 flex justify-center items-center gap-1">
                  <Icon
                    icon="material-symbols-light:favorite-outline"
                    className="text-xl"
                  />
                  {selectedItem.favorites}
                </div>
              </div>
              <div className="my-2">
                <span className="bg-primary/10 rounded-md py-1 text-sm  px-3">
                  {selectedItem.rating}
                </span>
              </div>
              <div className="py-2">
                <p>Synopsis:</p>
                <p className="py-4 text-sm text-left">
                  {selectedItem.synopsis}
                </p>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
}

TopAnimeComponent.propTypes = {
  topAnime: PropTypes.any,
};
