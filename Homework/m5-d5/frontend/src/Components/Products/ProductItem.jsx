import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  console.log(product);

  return (
    <>
      {product && (
        <Card style={{ width: "16rem" }} className="m-1">
          <Card.Img variant="top" src={product.imageUrl} />
          <Card.Body>
            <Card.Title>{`${product.brand} ${product.name} (${product.category})`}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            {/* <Button variant="primary"
                onClick={() => navigate('/single-product')}>Peview</Button> */}
            <Link to={`/single-product/${product.id}`}>
              <Button variant="success">$ {product.price}</Button>
            </Link>
          </Card.Body>
        </Card>
      )}
      {/* )} */}
    </>
  );
};
export default ProductItem;
