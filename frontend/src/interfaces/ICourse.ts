import { AdminInterface } from "./IAdmin";
import { CourseStatusInterface } from "./ICourseStatus";

export interface CourseInterface {
  ID?: number;
  Name?: string;
  Detail?: string;
  Price?: number;
  Image?: string;
  Pdf?: string;
  CreatedAt?: string;
  UpdatedAt?: string;

  AdminID?: number;
  Admin?: AdminInterface;

  CourseStatusID?: number;
  CourseStatus?: CourseStatusInterface;
}
