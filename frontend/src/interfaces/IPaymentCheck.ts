import { EmployeeInterface } from "./IEmployee";
import { PaymentStatusInterface } from "./IPaymentStatus";
import { CourseRegistrationInterface } from "./ICourseRegistration";

export interface PaymentCheckInterface {
  ID?: number;
  Comment?: string;

  EmployeeID?: number;
  Employee?: EmployeeInterface;

  PaymentStatusID?: number;
  PaymentStatus?: PaymentStatusInterface;

  CourseRegistrationID?: number;
  CourseRegistration?: CourseRegistrationInterface;
}
