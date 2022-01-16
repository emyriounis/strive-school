import { Container, Button, Jumbotron } from "react-bootstrap";
import CommentsItems from "../Comments/CommentsItems";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const SingleProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [reviews, setReviews] = useState([]);
  const loadProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/${id}`
      );
      if (response.ok) {
        const product = await response.json();
        setProduct(product);
        setReviews(product.reviews);
        return product;
      } else {
        alert("Fetch error!");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  console.log(reviews);
  return (
    <>
      {!loading && (
        <Container>
          <div className="my-5">
            <Jumbotron>
              <h1>{`${product.name} (${product.categories
                .map((category) => category.name)
                .join(", ")})`}</h1>
              <p>{product.description}</p>
              <p>
                <Button
                  onClick={() => navigate("./back-office")}
                  variant="primary"
                >
                  Edit
                </Button>
              </p>
            </Jumbotron>
            <h5>Reviews</h5>
            <CommentsItems comments={reviews} />
          </div>
        </Container>
      )}
    </>
  );
};

export default SingleProductPage;
