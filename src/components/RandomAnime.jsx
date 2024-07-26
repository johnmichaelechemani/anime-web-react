import { Icon } from "@iconify-icon/react";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import ModalMain from "./ModalMain";
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
      <div className=" flex justify-center sm:justify-start relative items-center sm:pl-8 pb-32 sm:pb-20">
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
          <ModalMain
            ref={modalRef}
            data={data}
            onClose={() => setIsModalOpen(false)}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>
    </>
  );
}
RandomAnime.propTypes = {
  data: PropTypes.any,
};
export default RandomAnime;
