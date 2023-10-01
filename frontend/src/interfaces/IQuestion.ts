import { AdminInterface } from "./IAdmin";

export interface QuestionInterface {
  ID?: number;
  Title?: string;
  Detail?: string;
  Reply?: string;

  AdminID?: number;
  Admin?: AdminInterface;
}
