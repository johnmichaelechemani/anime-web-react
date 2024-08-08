import PropTypes from "prop-types";
import { Icon } from "@iconify-icon/react";
import { forwardRef, useEffect } from "react";

const ModalMain = forwardRef(({ onClose, data, isModalOpen }, ref) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen, onClose]);

  return (
    <dialog id="modal" ref={ref} className="modal" onClose={onClose}>
      <div className="modal-box bg-gray-800/50 text-gray-200 border border-gray-500/50 backdrop-blur-xl">
        {data && data.trailer && data.trailer.youtube_id && isModalOpen ? (
          <iframe
            width="100%"
            height="315"
            className="rounded-xl"
            src={`https://www.youtube-nocookie.com/embed/${data.trailer.youtube_id}?rel=0&modestbranding=1&wmode=opaque&autoplay=1`}
            title={`${data.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <></>
        )}
        <h3 className="text-3xl py-3 font-bold">{data.title}</h3>
        <div className="flex justify-start items-center gap-2">
          {data.rank && (
            <div className="bg-primary/10 rounded-md p-1 flex justify-center items-center gap-1">
              <Icon icon="game-icons:rank-2" className="text-xl" /> {data.rank}
            </div>
          )}
          <div className="bg-primary/10 rounded-md p-1 flex justify-center items-center gap-1">
            <Icon icon="mdi:cc-outline" className="text-xl" /> {data.episodes}
          </div>
          {data.score && (
            <div className="bg-primary/10 rounded-md p-1 flex justify-center items-center gap-1">
              <Icon
                icon="material-symbols-light:sports-score"
                className="text-xl"
              />
              {data.score}
            </div>
          )}
          {data.favorites && (
            <div className="bg-primary/10 rounded-md p-1 flex justify-center items-center gap-1">
              <Icon
                icon="material-symbols-light:favorite-outline"
                className="text-xl"
              />
              {data.favorites}
            </div>
          )}
        </div>
        <div className="my-2">
          <span className="bg-primary/10 rounded-md py-1 text-sm px-3">
            {data.rating}
          </span>
        </div>
        <div className="py-2">
          <p>Synopsis:</p>
          <p className="py-4 text-sm text-left">{data.synopsis}</p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
});

ModalMain.propTypes = {
  data: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

ModalMain.displayName = "ModalMain";

export default ModalMain;
