import { Link } from 'react-router-dom';
import Cards from '../cards/Cards';

function SearchResults({ searchResults, onLinkClick }) {
  return (
    <div className="d-flex flex-wrap gap-5">
 
        {searchResults && searchResults.map((movie) => (
          // <li key={movie.id}>
          //   <Link to={`/movie/${movie.id}`} onClick={onLinkClick}>{movie.title}</Link>
          // </li>
  <Cards
    key={movie.id}
    poster_path={movie.poster_path}
    cardTitle={movie.title}
    cardText={movie.overview}
    button=<Link to={`/movie/${movie.id}`} onClick={onLinkClick} style={{ color: 'white', textDecoration: 'none' }}>Go Details</Link>
    movieId={movie.id}
    onClick={onLinkClick}
  />
        ))}

    </div>
  );
}

export default SearchResults;