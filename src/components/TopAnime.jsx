import PropTypes from "prop-types";
import { useRef, useState } from "react";
import CardMain from "./CardMain";
import ModalMain from "./ModalMain";
export default function TopAnimeComponent({ topAnime }) {
  const modalTopAnimeRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const handleTopAnimeModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    // console.log(item);
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
          <ModalMain
            ref={modalTopAnimeRef}
            data={selectedItem}
            onClose={() => setIsModalOpen(false)}
            isModalOpen={isModalOpen}
          />
        </div>
      )}
    </>
  );
}

TopAnimeComponent.propTypes = {
  topAnime: PropTypes.any,
};
