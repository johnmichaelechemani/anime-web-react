import PropTypes from "prop-types";

export default function Tabs({ navItem, activeCategory }) {
  return (
    <>
      <div className="py-5 pt-20 sm:pt-10 flex justify-start px-8 items-center gap-3 relative">
        <div className="flex justify-start items-center gap-3 px-5 overflow-hidden overflow-x-scroll no-scrollbar relative">
          {navItem.map((item) => {
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`btn btn-sm rounded-full uppercase px-6 ${
                  activeCategory === item.name
                    ? "btn-primary text-sm "
                    : "bg-transparent text-xs border border-gray-500/50"
                }`}
              >
                {" "}
                {item.name}
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3  bg-gradient-to-r from-base-100"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-base-100"></div>
      </div>
    </>
  );
}
Tabs.propTypes = {
  navItem: PropTypes.any,
  activeCategory: PropTypes.bool.isRequired,
};
