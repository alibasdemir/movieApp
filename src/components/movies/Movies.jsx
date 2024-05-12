import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import restService from '../../service/rest-service.js';
import Cards from '../cards/Cards.jsx';
import { Button } from 'react-bootstrap';

function Movies() {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async (page) => {
      try {
        let url = '/movie/popular?language=en-US&page=' + page;
        if (genreId) {
          url = `/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`;
        }
        const data = await restService(url);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        console.log(data);
      } catch (error) {
        console.error('Hata: ', error);
      }
    };

    fetchMovies(currentPage);
  }, [currentPage, genreId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [genreId]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // API'DE SORUN VAR SANIRIM. SON SAYFAYA GIDINCE GET İLE VERİLER ALINAMIYOR VE HATA VERİYOR...
  // const goToFirstPage = () => {
  //   setCurrentPage(1);
  // };

  // const goToLastPage = () => {
  //   setCurrentPage(totalPages);
  // };


  return (
    <div>

      <h1 style={{ textAlign: 'center'}}>MoviesApp 🎬</h1>
      <br />
      <hr />
      <br />
      <div className="d-flex flex-wrap gap-5">
        {movies.map((movie) => (
          <Cards
            key={movie.id}
            poster_path={movie.poster_path}
            cardTitle={movie.title}
            cardText={movie.overview}
            button="Go Detail"
            movieId={movie.id}
          />
        ))}
      </div>
      <br />
      <div className="pagination" style={{justifyContent: 'center'}}>
        {/* <button onClick={goToFirstPage} disabled={currentPage === 1}>First</button> */}
        <Button variant="warning" style={{width: '5%', marginRight:'10px'}} onClick={goToPrevPage} disabled={currentPage === 1}>Previous</Button>
        <span style={{ fontWeight: 'bold', marginTop: '5px'}}>{currentPage} / {totalPages}</span>
        <Button variant="warning" style={{width: '5%', marginLeft:'10px'}} onClick={goToNextPage} disabled={currentPage === totalPages}>Next</Button>
        {/* <button onClick={goToLastPage} disabled={currentPage === totalPages}>Last</button> */}
      </div>
    </div>
  );
}

export default Movies;
