import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import MovieCart from "./components/MovieCart";
import Loading from "./components/loading/Loading";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  const getMovies = (input, page) => {
    const trimmedInput = input.trim();
    setIsLoading(true);
    axios
      .get(
        `https://www.omdbapi.com/?s=${
          trimmedInput ? trimmedInput : "action"
        }&apikey=${apiKey}&page=${page}`
      )
      .then((res) => {
        if (res.data.Response === "True") {
          setMoviesData((prevMovies) =>
            page === 1 ? res.data.Search : [...prevMovies, ...res.data.Search]
          );
          setErr(false);
        } else {
          setErr(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getMovies(search, page);
  }, [page]);

  const btnHandler = (e) => {
    e.preventDefault();
    if (search) {
      setPage(1);
      setMoviesData([]);
      getMovies(search, 1);
    }
  };

  const loadMoreHandler = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <form onSubmit={btnHandler}>
        <div className="group m-auto justify-center flex">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input rounded-md"
            type="search"
            placeholder="Search Movies"
          />
          <button className="ml-1 cursor-pointer bg-gradient-to-r from-[#EB3349] to-[#F45C43] px-6 py-[7px] rounded-md text-white font-semibold shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-10px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] focus:shadow-[inset_-12px_-8px_40px_#46464620] transition-shadow">
            Search
          </button>
        </div>
      </form>

      <div className="justify-center m-auto p-auto align-center flex-row flex flex-wrap">
        {moviesData.map((data, index) => (
          <div key={index}>
            <MovieCart data={data} />
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center m-auto mt-[60px] mb-[60px]">
          <Loading />
        </div>
      ) : null}

      {moviesData.length > 0 && !err && (
        <button
          onClick={loadMoreHandler}
          className="overflow-hidden m-auto w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
        >
          Show More
          <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
          <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
          <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
          <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
            Explore!
          </span>
        </button>
      )}

      {err ? (
        <h1 className="m-auto flex justify-center mt-[90px]">
          No Movies Found
        </h1>
      ) : null}
    </>
  );
}

export default App;
