import PropTypes from "prop-types";

export default function TopAnimeComponent({ topAnime }) {
  console.log(topAnime);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-2 px-8 pb-5">
        {topAnime && topAnime.length > 0 ? (
          topAnime.map((item) => (
            <div
              key={item.mal_id}
              className="flex justify-center sm:justify-start gap-2 items-center"
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
                  </div>
                  <div className="pointer-events-none rounded-xl absolute inset-x-0 bottom-0 w-full h-[70%] bg-gradient-to-t from-base-100"></div>
                  <div className="pointer-events-none absolute rounded-xl inset-y-0 left-0 w-1/3 bg-gradient-to-r from-base-100/80"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

TopAnimeComponent.propTypes = {
  topAnime: PropTypes.arrayOf(
    PropTypes.shape({
      mal_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      images: PropTypes.shape({
        jpg: PropTypes.shape({
          image_url: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};
