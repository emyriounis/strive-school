import { Container } from "react-bootstrap";
import ProductItem from "../Products/ProductItem";
import NavBar from "../NavBar/Navbar";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(true);
  const loadProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/products");
      if (response.ok) {
        const products = await response.json();
        setProducts(products);
        return products;
      } else {
        throw new Error("Fetch error!");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <Container>
      <NavBar />
      <h3>Products</h3>
      <div className="d-flex justifiy-content-around flex-wrap">
        {!loading &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </Container>
  );
};

export default Homepage;
