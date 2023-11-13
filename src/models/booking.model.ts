import { BelongsToMixin } from "@interfaces/sequelize";
import { UserModel } from "@models/users.model";
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export interface BookingModel extends BelongsToMixin<UserModel, string, "user"> {}
export interface BookingModel extends Model<InferAttributes<BookingModel>, InferCreationAttributes<BookingModel>> {
  id: CreationOptional<string>;
  bookingId: string;
  passengers: string;
  response: string;
  userId?: ForeignKey<string>;
}

export function BookingModel(sequelize: Sequelize) {
  return sequelize.define<BookingModel>("Booking", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    passengers: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    response: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bookingId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}
