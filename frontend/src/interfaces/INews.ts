import { AdminInterface } from "./IAdmin";

export interface NewsInterface {
  ID?: number;
  Image?: string;

  AdminID?: number;
  Admin?: AdminInterface;
}
