import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Cart = sequelize.define("cart", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Cart;
