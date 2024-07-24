export default function RecommendationsComponent({ recommendations }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-2 px-8 pb-5">
        {recommendations ? (
          recommendations.map((item, index) => (
            <div key={index} className="flex justify-center gap-2 items-center">
              {item.entry.map((data, index2) => (
                <div
                  key={index2}
                  className="rounded-xl border border-gray-400/50 overflow-hidden"
                >
                  <div className="w-52 relative h-52">
                    <img
                      src={data.images.jpg.image_url}
                      className="object-cover object-center h-full w-full"
                    />
                    <div className="absolute text-gray-200 left-0 z-10 bottom-0">
                      <h2 className="text-sm p-2 font-extrabold backdrop-blur-[1px]">
                        {data.title}
                      </h2>
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-[70%] bg-gradient-to-t from-base-100"></div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
