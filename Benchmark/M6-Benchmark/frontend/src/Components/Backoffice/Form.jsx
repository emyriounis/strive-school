import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Edit = ({ newProduct }) => {
  const { id } = useParams();
  console.log(id);

  const [state, setState] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
  });
  // const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const loadProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/${id}`
      );
      if (response.ok) {
        const product = await response.json();
        setState(product);
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
    if (!newProduct) loadProduct();
    setLoading(false);
  }, []);

  const handlePost = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/`,
        {
          method: "POST",
          body: JSON.stringify({
            ...state,
            image: "image url",
            categoryId: ["c151fe52-ca0d-425c-8428-def2ee28725a"],
          }), //to change...
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        alert("Failed to fetch");
      } else {
        const updatedProduct = await response.json();
        // if (image) {
        //   await uploadProductImage(updatedProduct.id);
        // }
        return updatedProduct;
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(state),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        alert("Failed to fetch");
      } else {
        const updatedProduct = await response.json();
        // if (image) {
        //   await uploadProductImage(updatedProduct.id);
        // }
        return updatedProduct;
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteProduct = async (event) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        alert("Failed to fetch");
      } else {
        const resp = await response.json();
        return resp;
      }
    } catch (error) {
      alert(error);
    }
  };

  // const uploadProductImage = async (id) => {
  //   try {
  //     const cover = new FormData();
  //     cover.append("productImg", image);
  //     console.log(cover);

  //     const response = await fetch(
  //       `${process.env.REACT_APP_BACKEND_URL}/products/${id}/upload`,
  //       {
  //         method: "POST",
  //         body: cover,
  //       }
  //     );
  //     console.log(response);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch");
  //     } else {
  //       const cover2 = await response.json();
  //       return cover2;
  //     }
  //   } catch (error) {
  //     alert(error);
  //     console.log(error);
  //   }
  // };

  return (
    <Container>
      <h3 className="mt-5">Product Edit</h3>
      <div className="border-top"></div>
      {!loading && (
        <div className="mt-5">
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                value={state.name}
                onChange={(e) =>
                  setState({
                    ...state,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="price"
                value={state.price}
                onChange={(e) =>
                  setState({
                    ...state,
                    price: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="description"
                value={state.description}
                onChange={(e) =>
                  setState({
                    ...state,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Control
                type="text"
                placeholder="category"
                value={state.categories
                  .map((category) => category.name)
                  .join(", ")}
                onChange={(e) =>
                  setState({
                    ...state,
                    categories[0].name: e.target.value,
                  })
                }
              />
            </Form.Group> */}

            {/* <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
              />
            </Form.Group> */}
            <Button
              type="submit"
              variant="primary"
              onClick={newProduct ? handlePost : handleSubmit}
            >
              Save Details
            </Button>
            {!newProduct && (
              <Button type="button" variant="danger" onClick={deleteProduct}>
                Delete
              </Button>
            )}
          </Form>
        </div>
      )}
    </Container>
  );
};

export default Edit;
