import "./movieCart.css";
const MovieCart = ({ data }) => {
  return (
    <div className="flex float-left p-5  ">
      <div className="card">
        <img className="" src={data.Poster} alt="" />

        <div className="card__content">
          <p className="card__title">Title: {data.Title}</p>

          <p className="card__description">Year: {data.Year}</p>
          <p className="card__description">Type: {data.Type}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCart;
