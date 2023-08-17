import { AdminInterface } from "./IAdmin";

export interface NewsInterface {
  ID?: number;
  Title?: string;
  Detail?: string;
  CreatedAt?: string;

  AdminID?: number;
  Admin?: AdminInterface;
}
