import { GenderInterface } from "./IGender";

export interface MemberInterface {
  ID?: number;
  Email?: string;
  Firstname?: string;
  Lastname?: string;
  Password?: string;
  Tel?: string;
  Address?: string;
  Birthday?: Date;
  Image?: string;

  Gender?: GenderInterface;
  GenderID?: number;
}
