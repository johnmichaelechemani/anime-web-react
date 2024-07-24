import { Icon } from "@iconify-icon/react";
import PropTypes from "prop-types";
function RandomAnime({ data }) {
  return (
    <>
      <div className="absolute -top-10 sm:-top-32 z-10">
        <div className=" rounded-xl bg-gradient-to-tr from-blue-500 from-30% p-[1px] to-cyan-500 to-100% shadow-lg shadow-cyan-500/50 transition overflow-hidden">
          <div className="w-52 relative rounded-xl h-52 ">
            <img
              src={data.images.jpg.image_url}
              alt={data.title}
              className="object-cover object-center transition rounded-xl h-full w-full"
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
    </>
  );
}
RandomAnime.propTypes = {
  data: PropTypes.shape({
    mal_id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.shape({
      jpg: PropTypes.shape({
        image_url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    episodes: PropTypes.number.isRequired,
  }).isRequired,
};
export default RandomAnime;
