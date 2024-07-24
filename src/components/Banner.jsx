import PropTypes from "prop-types";
import Search from "./Search";
export default function Banner({ bgImage }) {
  return (
    <>
      <div className="relative pb-5">
        <div className="h-52 sm:h-60 md:h-96 relative">
          <img
            src={bgImage}
            alt=""
            className="object-cover object-center h-full w-full"
          />
          <Search />
          <h1 className="absolute text-gray-200 top-20 left-2 px-5 text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold z-10  drop-shadow-[0,0,0,0,8]">
            Watch anytime,{" "}
            <span className="bg-gradient-to-r relative from-blue-500 from-20% to-cyan-500 to-70%  bg-clip-text text-transparent">
              anywhere.
            </span>
          </h1>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[80%] backdrop-blur-[2px] bg-gradient-to-r from-base-100"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-1/4 bg-gradient-to-t from-base-100"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-base-100"></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 w-full h-1/4 bg-gradient-to-b from-base-100"></div>
        </div>
      </div>
    </>
  );
}
Banner.propTypes = {
  bgImage: PropTypes.string.isRequired,
};
