import { Icon } from "@iconify-icon/react";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
function RandomAnime({ data }) {
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(true);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  return (
    <>
      <div className="absolute -top-10 sm:-top-32 z-10">
        <div
          className=" rounded-xl bg-gradient-to-tr from-blue-500 from-30% p-[1px] to-cyan-500 to-100% shadow-lg shadow-cyan-500/50 transition overflow-hidden"
          onClick={handleModal}
        >
          <div className="w-52 relative rounded-xl h-52 ">
            <img
              src={data.images.jpg.image_url}
              alt={data.title}
              className="object-cover object-center transition hover:opacity-75 rounded-xl h-full w-full"
            />
            <div className="absolute text-gray-200 left-0 z-10 bottom-0">
              <h2 className=" text-sm p-2 font-extrabold  backdrop-blur-[1px]">
                {data.title}
              </h2>
              <div className="flex text-sm justify-start items-center">
                <span className="gap-1 flex justify-start items-center bg-primary/30 rounded-md px-2 py-0.5 m-1">
                  <Icon icon="mdi:cc-outline" className="text-xl" />
                  {data.episodes}
                </span>
                <span>{data.type}</span>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl w-full h-[70%] bg-gradient-to-t from-base-100"></div>
          </div>
        </div>
      </div>
      {/* modal */}
      <div>
        <dialog
          id="modal"
          className="modal "
          ref={modalRef}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="modal-box bg-gray-800/50 text-gray-200 border border-gray-500/50 backdrop-blur-xl">
            <div>
              {data &&
              data.trailer &&
              data.trailer.youtube_id &&
              isModalOpen ? (
                <iframe
                  width="100%"
                  className="rounded-xl"
                  height="315"
                  src={data.trailer.embed_url}
                  title={`${data.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <></>
              )}
            </div>
            <h3 className="text-3xl py-3 font-bold">{data.title}</h3>
            <div className="flex justify-start items-center gap-2">
              {data.rank ? (
                <div className="bg-primary/10 rounded-md  p-1 flex justify-center items-center gap-1">
                  <Icon icon="game-icons:rank-2" className="text-xl" />{" "}
                  {data.rank}
                </div>
              ) : (
                <></>
              )}
              <div className="bg-primary/10 rounded-md  p-1 flex justify-center items-center gap-1">
                <Icon icon="mdi:cc-outline" className="text-xl" />{" "}
                {data.episodes}
              </div>
              {data.score ? (
                <div className="bg-primary/10 rounded-md  p-1 flex justify-center items-center gap-1">
                  <Icon
                    icon="material-symbols-light:sports-score"
                    className="text-xl"
                  />
                  {data.score}
                </div>
              ) : (
                <></>
              )}
              {data.favorites ? (
                <div className="bg-primary/10 rounded-md  p-1 flex justify-center items-center gap-1">
                  <Icon
                    icon="material-symbols-light:favorite-outline"
                    className="text-xl"
                  />
                  {data.favorites}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="my-2">
              <span className="bg-primary/10 rounded-md py-1 text-sm  px-3">
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
      </div>
    </>
  );
}
RandomAnime.propTypes = {
  data: PropTypes.any,
};
export default RandomAnime;
