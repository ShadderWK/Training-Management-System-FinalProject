import { MemberInterface } from "./IMember";
import { CourseInterface } from "./ICourse";

export interface CourseRegistrationInterface {
  ID?: number;
  Receipt?: string;

  MemberID?: number;
  Member?: MemberInterface;

  CourseID?: number;
  Course?: CourseInterface;
}
