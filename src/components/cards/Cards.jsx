import { Accordion } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate  } from 'react-router-dom';

function Cards(props) {
  const navigate = useNavigate();

  const handleGoToDetail = () => {
    navigate(`/movie/${props.movieId}`);
  };

  return (
    <Card style={{ width: '20rem', margin: '50px' }} className='col-md-6 col-lg-4 my-2'>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${props.poster_path}`} />
      <Card.Body>
        <Card.Title style={{ textAlign: 'center'}}>{props.cardTitle}</Card.Title>
        <hr />
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Movie Description</Accordion.Header>
            <Accordion.Body>
              {props.cardText}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <hr />
        <div style={{textAlign: 'center'}}>
          <Button variant="primary" style={{textAlign: 'center'}} onClick={handleGoToDetail}>{props.button}</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Cards;
