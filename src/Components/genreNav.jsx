const GenreNav = ({ genreData }) => {
  return (
    <div className="genrepage_nav">
      {genreData.map((genre) => {
        return (
          <div key={genre.id} className="genrepage_nav_one">
            <button className="genrepage_nav_btn">
              {genre.name}
              {genre.emoji}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GenreNav;
