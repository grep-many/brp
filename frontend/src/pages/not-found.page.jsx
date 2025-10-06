import EmptyCard from '../components/EmptyCard';
import { Img404 } from '../assets';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <EmptyCard
      img={Img404}
      message="Oops! The page you are looking for does not exist."
      onClick={() => navigate('/')}
    />
  );
};

export default NotFound;
