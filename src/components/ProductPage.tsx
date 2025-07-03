import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://dummyjson.com/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.log(err));
    }
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-black text-white rounded">
        Back
      </button>
      <img src={product.images[0]} alt={product.title} className="w-1/2 mb-6 rounded" />
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-medium">Rating: {product.rating}</p>
    </div>
  );
};

export default ProductPage;
