import { AdminInterface } from "./IAdmin";
import { CourseStatusInterface } from "./ICourseStatus";

export interface CourseInterface {
  ID?: number;
  Name?: string;
  Detail?: string;
  Price?: number;
  Image?: string;
  LinkFile?: string;
  LinkContact?: string;
  QRContact?: string;
  Place?: string;
  StartTime?: Date;
  EndTime?: Date;
  CreatedAt?: string;
  UpdatedAt?: string;

  AdminID?: number;
  Admin?: AdminInterface;

  CourseStatusID?: number;
  CourseStatus?: CourseStatusInterface;
}
