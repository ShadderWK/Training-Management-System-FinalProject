import { MemberInterface } from "./IMember";
import { CourseInterface } from "./ICourse";
import { PaymentStatusInterface } from "./IPaymentStatus";

export interface CourseRegistrationInterface {
  ID?: number;
  Receipt?: string;
  Note?: string;
  CreatedAt?: string;
  UpdatedAt?: string;

  MemberID?: number;
  Member?: MemberInterface;

  CourseID?: number;
  Course?: CourseInterface;

  PaymentStatusID?: number;
  PaymentStatus?: PaymentStatusInterface;
}
