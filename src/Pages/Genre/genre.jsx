import "./genre.css";
import { movieGenres } from "../../data";
import { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import BasicModalTwo from "../../Components/modaltwo";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { SelectedAll } from "../../Redux/allSlice";
import { useSelector } from "react-redux";
import { db } from "../../Logic/firebase";
import { toast } from "react-hot-toast";

const Genre = () => {
  //state for storing user genres
  const [userGenres, setUserGenres] = useState([]);
  const [movieGenre, setMovieGenre] = useState(movieGenres);
  const uid = useSelector(SelectedAll).uid;
  const userDetailsGoogle = useSelector(SelectedAll).googleDisplayName;
  const docRef = collection(db, "users");

  //using useNavigate
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.dismiss();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const skipGenre = async () => {
    navigate("/home");
    await setDoc(doc(docRef, uid), {
      genre: [],
    });
  };

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

    const selectedGenreTwo = movieGenre.find((genre) => genre.id === id);
    if (!selectedGenreTwo.condition) {
      setUserGenres((prev) => [...prev, selectedGenreTwo]);
    } else {
      setUserGenres((prev) =>
        prev.filter((genre) => genre.id !== selectedGenreTwo.id)
      );
    }
  };

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
            <button onClick={skipGenre} className="skipgenre">
              Skip
            </button>
            <BasicModalTwo
              userGenres={userGenres}
              setUserGenres={setUserGenres}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genre;
