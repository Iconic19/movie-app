import React from "react";
import { axios } from "axios";

const checking = () => {
  axios
    .get("https://imdb188.p.rapidapi.com/api/v1/searchIMDB", {
      params: { query: input ? input : "random" },
      headers: {
        "X-RapidAPI-Key": "eb82b6a42bmsh4ae0b463e6e4468p155517jsn1bd35e071ca3",
        "X-RapidAPI-Host": "imdb188.p.rapidapi.com",
      },
    })
    .then((res) => console.log(res));

  return <div></div>;
};

export default checking;
// axios
//   .get("https://imdb188.p.rapidapi.com/api/v1/searchIMDB", {
//     params: { query: input ? input : "random" },
//     headers: {
//       "X-RapidAPI-Key": "eb82b6a42bmsh4ae0b463e6e4468p155517jsn1bd35e071ca3",
//       "X-RapidAPI-Host": "imdb188.p.rapidapi.com",
//     },
//   })
//   .then((res) => setMoviesData(res.data))
//   .then(() => setIsLoading(false))
//   .catch(() => setError(true));
