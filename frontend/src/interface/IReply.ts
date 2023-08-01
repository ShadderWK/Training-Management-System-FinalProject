import { QuestionInterface } from "./IQuestion";
import { EmployeeInterface } from "./IEmployee";

export interface ReplyInterface {
  ID?: number;
  Title?: string;
  Detail?: string;

  QuestionID?: number;
  Question?: QuestionInterface;

  EmployeeID?: number;
  Employee?: EmployeeInterface;
}
