import { Link } from 'react-router-dom';

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard = ({ id, title, image, price }: BookCardProps) => {
  return (
    <Link to={`/product/${id}`} className="border rounded-lg p-4 hover:shadow-lg transition-all">
      <img src={image} alt={title} className="w-full h-40 object-cover mb-3 rounded" />
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-gray-600">${price}</p>
    </Link>
  );
};

export default BookCard;
