import { useState, useEffect } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import restService from '../../service/rest-service';
import { Link, useNavigate } from 'react-router-dom';
import SearchResults from '../search/SearchResult'

function NavbarHead() {
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const url = '/genre/movie/list?language=en';
        const response = await restService(url);
        setGenres(response.genres);
      } catch (error) {
        console.error('Hata: ', error);
      }
    };

    fetchGenres();
  }, []);


  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const url = `/search/movie?query=${searchQuery}&page=${currentPage}`;
        const response = await restService(url);
        setSearchResults(response.results);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error('Arama Hatası: ', error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery, currentPage]);

    useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      navigate('/search-results');
    } catch (error) {
      console.error('Arama Hatası: ', error);
    }
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    setCurrentPage(1);
    setSearchQuery('');
  };

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

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">BEYZAPROJE</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-4 my-lg-2"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Item>
                <Link to="/" className="nav-link" onClick={clearSearchResults}>Home</Link>
              </Nav.Item>  
              <Nav.Item>
                <Link to="/mylist" className="nav-link" onClick={clearSearchResults}>My List</Link>
              </Nav.Item>            
              <NavDropdown title="Categories" id="navbarScrollingDropdown">
  {genres.map((genre) => (
    <NavDropdown.Item
      key={genre.id}
      as={Link}
      to={`/movies/${genre.id}`}
      onClick={clearSearchResults}
    >
      {genre.name}
      <NavDropdown.Divider />
    </NavDropdown.Item>
  ))}
</NavDropdown>
            </Nav>
            <Form className="d-flex" onSubmit={(e) => { e.preventDefault(); }}>
              <Form.Control
                type="search"
                placeholder="Movie Search  🔍"
                className="me-4"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) {
                    navigate('/search-results');
                  }
                }}
              />
              <Button variant="outline-success" onClick={handleSearch} style={{ pointerEvents: 'none', opacity: 0.5 }}>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

  {searchResults.length > 0 &&
    <div>
      <br />
      <h1 style={{ textAlign: 'center'}}>Search Results 🎬</h1>
      <br />
      <hr />
      <br />
    </div>
  }
  <SearchResults searchResults={searchResults} onLinkClick={clearSearchResults}/>
  <br />
  {searchResults.length > 0 && (
    <div className="pagination" style={{ justifyContent: 'center' }}>
      <Button variant="warning" style={{width: '5%', marginRight:'10px'}} onClick={goToPrevPage} disabled={currentPage === 1}>Previous</Button>
      <span style={{ fontWeight: 'bold', marginTop: '5px'}}>{currentPage} / {totalPages}</span>
      <Button variant="warning" style={{width: '5%', marginLeft:'10px'}} onClick={goToNextPage} disabled={currentPage === totalPages}>Next</Button>
    </div>
  )}

    </div>
  );
}

export default NavbarHead;
