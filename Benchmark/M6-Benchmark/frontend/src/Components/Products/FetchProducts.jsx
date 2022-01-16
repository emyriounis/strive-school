import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const FetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/product/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("fail to fetch");
      }
      const data = response.json();
      setProducts(data);
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      <ProductItem products={products} />
    </>
    // <>
    //     {products && products.map(p =>
    //         <ProductItem key={p.id} products={products}/>
    //     )}
    // </>
  );
};

export default FetchProducts;
