import ListGroup from "react-bootstrap/ListGroup";
import { PastaType } from "../types/types";

const DishComments = ({
  selectedDish,
}: {
  selectedDish: PastaType | undefined;
}) => (
  <ListGroup>
    {selectedDish ? (
      selectedDish.comments.map((c) => (
        <ListGroup.Item key={c.id}>{c.comment}</ListGroup.Item>
      ))
    ) : (
      <ListGroup.Item>Click on a pasta to see the reviews!</ListGroup.Item>
    )}
  </ListGroup>
);

export default DishComments;
