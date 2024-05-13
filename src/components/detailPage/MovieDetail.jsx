import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import restService from '../../service/rest-service.js';
import { useDispatch, useSelector } from 'react-redux';
import { addToMyList, removeFromMyList } from '../../redux/reducers/myListSlice.js';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { showToastSuccess, showToastError } from '../../tostify/Tostify.jsx';

function MovieDetail() {
  const { movieId } = useParams(); // movieId'yi useParams ile al
  const [movieDetails, setMovieDetails] = useState(null);
  const myList = useSelector(state => state.myList.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await restService(`/movie/${movieId}?language=en-US`);
        setMovieDetails(data);
        console.log("TIKLANAN VERİ:");
        console.log(data);
      } catch (error) {
        console.error('Error fetching movie details: ', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>DETAYLAR BEKLENİYOR...</div>;
  }

  const handleAddToList = () => {
    dispatch(addToMyList(movieId));
    showToastSuccess(`${movieDetails.title} added to My List 😍`);
  };

  const handleRemoveFromList = () => {
    dispatch(removeFromMyList(movieId));
    showToastError(`${movieDetails.title} removed from My List 😭`);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center'}}>{movieDetails.title} 🎬</h1>
      <br />
      <hr />

    <Container className="mt-4" >
      <Row className="justify-content-center" >
        <Col sm={8}>
          <Card className="text-center">
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt="" />
            <Card.Body>
              <Card.Title style={{ color: "red" }}>{movieDetails.title}</Card.Title>
              <div className="card">
    <div className="card-body">
        <ul className="list-group list-group-flush">
            <li className="list-group-item">{movieDetails.tagline}</li>
            <li className="list-group-item">Description {movieDetails.overview}</li>

            <li className="list-group-item">Movie Language: {movieDetails.original_language}</li>
            <li className="list-group-item">Movie Release Date: {movieDetails.release_date}</li>
            <li className="list-group-item">Movie Score: {movieDetails.vote_average}</li>
            {movieDetails.genres.map((category, index) => (
                  <li className='list-group-item' key={index}>
                    {category.name}
                  </li>
                ))}
            <li className="list-group-item">Movie Page: {movieDetails.homepage}</li>
        </ul>
    </div>
</div>

              {myList.includes(movieId) ? (
                <Button variant="danger" onClick={handleRemoveFromList}>Remove from My List</Button>
              ) : (
                <Button variant="success" onClick={handleAddToList}>Add to My List</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default MovieDetail;
