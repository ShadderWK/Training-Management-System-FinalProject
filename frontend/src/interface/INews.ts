import { AdminInterface } from "./IAdmin";

export interface NewsInterface {
  ID?: number;
  Title?: string;
  Detail?: string;

  AdminID?: number;
  Admin?: AdminInterface;
}
