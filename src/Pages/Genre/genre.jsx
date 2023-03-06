import "./genre.css";
import { movieGenres } from "../../data";
import { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Genre = () => {
  //state for storing user genres
  const [userGenres, setUserGenres] = useState([]);
  const [userGenresTwo, setUserGenresTwo] = useState([]);
  const [movieGenre, setMovieGenre] = useState(movieGenres);

  //adding highlight to selected genre
  const selectedGenre = (id) => {
    setMovieGenre(
      movieGenre.map((genre) => {
        if (genre.id === id) {
          return {
            ...genre,
            condition: !genre.condition,
          };
        } else {
          return genre;
        }
      })
    );

    setUserGenres(
      movieGenre
        .filter((genre) => genre.id === id)
        .map((genre) => {
          return genre.id === id && !genre.condition
            ? setUserGenresTwo((prev) => [...prev, genre.name])
            : "";
        })
    );
  };

  console.log(userGenresTwo);

  return (
    <div className="genre_one">
      <div className="genre_two padding">
        <h3>A little about you if you don't mind.</h3>
        <p>What are your genre?</p>
        <div className="genre_three">
          <div className="genre_four">
            {movieGenre.map((movieGenres) => {
              return (
                <span
                  onClick={() => {
                    selectedGenre(movieGenres.id);
                  }}
                  key={movieGenres.id}
                  className={movieGenres.condition ? "genreIsSelected" : ""}
                >
                  {" "}
                  {movieGenres.condition && <BsFillCheckCircleFill />}{" "}
                  {movieGenres.name}
                </span>
              );
            })}
          </div>
          <div className="genre_five">
            <button className="skipgenre">Skip</button>
            <button className="donegenre">Done</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genre;
