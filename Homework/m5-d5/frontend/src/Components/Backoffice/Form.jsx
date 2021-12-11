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
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const loadProduct = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/products/${id}`);
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
      const response = await fetch(`http://127.0.0.1:3001/products/`, {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Failed to fetch");
      } else {
        const updatedProduct = await response.json();
        if (image) {
          await uploadProductImage(updatedProduct.id);
        }
        return updatedProduct;
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:3001/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Failed to fetch");
      } else {
        const updatedProduct = await response.json();
        if (image) {
          await uploadProductImage(updatedProduct.id);
        }
        return updatedProduct;
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteProduct = async (event) => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/products/${id}`, {
        method: "DELETE",
      });
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

  const uploadProductImage = async (id) => {
    try {
      const cover = new FormData();
      cover.append("productImg", image);
      console.log(cover);

      const response = await fetch(
        `http://127.0.0.1:3001/products/${id}/upload`,
        {
          method: "POST",
          body: cover,
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const cover2 = await response.json();
        return cover2;
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

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
                type="text"
                placeholder="brand"
                value={state.brand}
                onChange={(e) =>
                  setState({
                    ...state,
                    brand: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
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
                type="text"
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
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="category"
                value={state.category}
                onChange={(e) =>
                  setState({
                    ...state,
                    category: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
              />
            </Form.Group>
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

// class Edit extends Component {
//     state = {
//         registration: {
//             name: "",
//             description: "",
//             brand: "",
//             category: "",
//             price: "",
//             imageURL: "",

//         },
//         showComplete: false,
//     };

//     handleInput = (key, value) => {
//         this.setState({
//             registration: {
//                 ...this.state.registration,
//                 [key]: value,
//             },
//         });
//     };

//     // formIsValidated = () => {
//     //     let isValidated = false;
//     //     if (
//     //         this.state.registration.name.length >= 2 &&
//     //         this.state.registration.brand.length >= 3 &&

//     //     ) {
//     //         isValidated = true;
//     //     }
//     //     return isValidated;
//     // };

//     handleRegistration = (e) => {
//         e.preventDefault();
//         this.setState({
//             showComplete: true,
//         });
//     };

//     render() {
//         return (
//             <div
//                 className="d-flex flex-column align-items-center mt-5"
//                 style={{ color: "white" }}
//             >
//                 {this.state.showComplete ? (
//                     <>
//                         <h1>Registration complete!</h1>
//                         <h3>Your details:</h3>
//                         <p>{this.state.registration.name}</p>
//                         <p>{this.state.registration.description}</p>
//                         <p>{this.state.registration.brand}</p>
//                         <p>{this.state.registration.category}</p>
//                         <p>{this.state.registration.price}</p>
//                         <p>{this.state.registration.imageURL}</p>

//                     </>
//                 ) : (
//                     <>
//                         <h1>......</h1>
//                         <Form onSubmit={this.handleRegistration}>
//                             <Form.Group>
//                                 <Form.Label>Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     required
//                                     onChange={(e) => this.handleInput("name", e.target.value)}
//                                     value={this.state.registration.name}
//                                 />
//                             </Form.Group>
//                             <Form.Group>
//                                 <Form.Label>Surname</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     required
//                                     onChange={(e) => this.handleInput("description", e.target.value)}
//                                     value={this.state.registration.description}
//                                 />
//                             </Form.Group>
//                             <Form.Group>
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     required
//                                     onChange={(e) => this.handleInput("brand", e.target.value)}
//                                     value={this.state.registration.brand}
//                                 />
//                             </Form.Group>
//                             <Form.Group>
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     required
//                                     onChange={(e) => this.handleInput("category", e.target.value)}
//                                     value={this.state.registration.category}
//                                 />
//                             </Form.Group>
//                             <Form.Group>
//                                 <Form.Label>Year of Birth</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     required
//                                     onChange={(e) =>
//                                         this.handleInput("price", e.target.value)
//                                     }
//                                     value={this.state.registration.price}
//                                 />
//                             </Form.Group>
//                             <Form.Group>
//                                 <Form.Label>Street Address</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     required
//                                     onChange={(e) =>
//                                         this.handleInput("imageURL", e.target.value)
//                                     }
//                                     value={this.state.registration.imageURL}
//                                 />
//                             </Form.Group>

//                             <Button type="submit" disabled={!this.formIsValidated()}>
//                                 Submit
//                             </Button>
//                         </Form>
//                     </>
//                 )}
//             </div>
//         );
//     }
// }

// export default Edit;
