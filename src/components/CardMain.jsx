import { Icon } from "@iconify-icon/react";
export default function CardMain({ src, animeTitle, episodes, type, onClick }) {
  return (
    <>
      <div
        className="flex justify-center sm:justify-start gap-2 items-center"
        onClick={onClick}
      >
        <div className="rounded-xl border border-cyan-500/50 overflow-hidden">
          <div className="w-52 relative h-52">
            <img
              src={src}
              className="object-cover object-center h-full w-full"
            />

            <div className="absolute text-gray-200 left-0 z-10 bottom-0">
              <p className="text-xs sm:text-sm p-2 font-extrabold backdrop-blur-[1px]">
                {animeTitle}
              </p>
              <div className="flex text-sm justify-start items-center">
                <span className="gap-1 flex justify-start items-center bg-gray-500/20 rounded-md px-1 m-1">
                  <Icon icon="mdi:cc-outline" className="text-xl" />
                  {episodes}
                </span>
                <span className="text-primary">{type}</span>
              </div>
            </div>
            <div className="pointer-events-none rounded-xl absolute inset-x-0 bottom-0 w-full h-[70%] bg-gradient-to-t from-base-100"></div>
            <div className="pointer-events-none absolute rounded-xl inset-y-0 left-0 w-1/3 bg-gradient-to-r from-base-100/80"></div>
          </div>
        </div>
      </div>
    </>
  );
}
