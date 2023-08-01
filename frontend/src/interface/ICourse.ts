import { EmployeeInterface } from "./IEmployee";

export interface CourseInterface {
  ID?: number;
  Name?: string;
  Detail?: string;
  Price?: number;
  Image?: string;

  EmployeeID?: number;
  Employee?: EmployeeInterface;
}
