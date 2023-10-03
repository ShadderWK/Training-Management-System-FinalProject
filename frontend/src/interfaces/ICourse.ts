import { AdminInterface } from "./IAdmin";

export interface CourseInterface {
  ID?: number;
  Name?: string;
  Detail?: string;
  Price?: number;
  Image?: string;

  AdminID?: number;
  Admin?: AdminInterface;
}
