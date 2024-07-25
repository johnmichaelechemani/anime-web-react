import PropTypes from "prop-types";
import { Icon } from "@iconify-icon/react";
import { useRef, useState } from "react";
import CardMain from "./CardMain";
export default function TopAnimeComponent({ topAnime }) {
  const modalTopAnimeRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(topAnime);
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
          <CardMain
            key={item.mal_id}
            src={item.images.jpg.image_url}
            animeTitle={item.title}
            episodes={item.episodes}
            type={item.type}
            onClick={() => handleTopAnimeModal(item)}
          />
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
                    className="rounded-xl"
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
