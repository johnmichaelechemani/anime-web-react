import "./styles/app.css";

function App() {
  return (
    <>
      <div className="m-10">
        {" "}
        <input
          type="search"
          placeholder="Search.."
          className="input input-bordered rounded-full w-full max-w-xs"
        />
        <div className="py-5 flex justify-start items-center gap-3">
          <button className="btn btn-sm rounded-full btn-primary px-6">
            All
          </button>
          <button className="btn btn-sm rounded-full ">Playlist</button>
          <button className="btn btn-sm rounded-full ">New</button>
          <button className="btn btn-sm rounded-full ">Small</button>
        </div>
      </div>
    </>
  );
}

export default App;
