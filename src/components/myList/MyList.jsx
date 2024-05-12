import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromMyList } from '../../redux/reducers/myListSlice.js';
import restService from '../../service/rest-service.js';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { showToastError } from '../../tostify/Tostify.jsx';

function MyList() {
  const myList = useSelector(state => state.myList.movies);
  const [movieDetails, setMovieDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await Promise.all(
        myList.map(async movieId => {   // MovieId redux ile... data.id api'den geliyor. remove işlemi için movieId kullanmamız gerekiyor.
          try {
            const data = await restService(`/movie/${movieId}?language=en-US`);
            return { id: movieId, title: data.title, score: data.vote_average, date: data.release_date, lang: data.original_language };
          } catch (error) {
            console.error('Error fetching movie details: ', error);
            return null;
          }
        })
      );

      setMovieDetails(details.filter(detail => detail !== null));
    };

    fetchMovieDetails();
  }, [myList]);

  const handleRemoveFromList = (movieId) => {
    dispatch(removeFromMyList(movieId));
    console.log(movieId);
    const removedMovie = movieDetails.find(movie => movie.id === movieId);
    if (removedMovie) {
      showToastError(`${removedMovie.title} removed from My List 😭`);
    }  };
  

  return (
    <div>
      <h1 style={{ textAlign: 'center'}}>My List 🎬</h1>
      <br />
      <hr />
      <br />
      {movieDetails.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Movie ID</th>
              <th>Movie Name</th>
              <th>Movie Score</th>
              <th>Release Date</th>
              <th>Original Language</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {movieDetails.map((movie, index) => (
              <tr key={index}>
                <td>{movie.id}</td>
                <td><Link to={`/movie/${movie.id}`}>{movie.title}</Link></td>
                <td>{movie.score}</td>
                <td>{movie.date}</td>
                <td>{movie.lang}</td>
                <td><Button variant="danger" size="sm" onClick={() => handleRemoveFromList(movie.id)}>Remove from My List</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h2>Your list is empty.</h2>
      )}
    </div>
  );
}

export default MyList;
