import { Icon } from "@iconify-icon/react";
import PropTypes from "prop-types";
function RandomAnime({ data }) {
  return (
    <>
      <div className="absolute -top-10 sm:-top-32 z-10">
        <div className=" rounded-xl border border-gray-400/50 overflow-hidden">
          <div className="w-52 relative h-52 ">
            <img
              src={data.images.jpg.image_url}
              alt={data.title}
              className="object-cover object-center h-full w-full"
            />
            <div className="absolute text-gray-200 left-0 z-10 bottom-0">
              <h2 className=" text-sm p-2 font-extrabold  backdrop-blur-[1px]">
                {data.title}
              </h2>
              <div className="flex ">
                <span className="gap-1 flex justify-start items-center bg-primary/30 rounded-md px-2 py-0.5 m-1 text-sm">
                  <Icon icon="mdi:cc-outline" className="text-xl" />
                  {data.episodes}
                </span>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-[70%] bg-gradient-to-t from-base-100"></div>
          </div>
        </div>
      </div>
    </>
  );
}
RandomAnime.propTypes = {
  data: PropTypes.shape({
    mal_id: PropTypes.number.isRequired,
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
