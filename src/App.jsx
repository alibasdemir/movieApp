import NavbarHead from './components/navbar/NavbarHead'
import Movies from './components/movies/Movies'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from './components/detailPage/MovieDetail';
import MyList from './components/myList/MyList';
import SearchResults from './components/search/SearchResult';
import store from '../src/redux/store';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <>
    <ToastContainer />
    <Provider store={store}>
    <Router>
      <div>
        <NavbarHead />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:genreId" element={<Movies />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
    </Provider>
    </>
  );
}


export default App
