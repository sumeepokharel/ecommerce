import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  image: string;
  // Add other properties like description, size, color, etc.
}

const ProductComponent: React.FC<{ product: Product }> = ({ product }) => {
  const wishlistProductIds = [1, 2, 3, 4, 5, 6, 7];
  const isInWishlist = wishlistProductIds.includes(product.id);

  return (
    <div>
      {isInWishlist && (
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      )}
    </div>
  );
};

export default ProductComponent;
