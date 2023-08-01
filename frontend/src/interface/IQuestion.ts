import { MemberInterface } from "./IMember";

export interface QuestionInterface {
  ID?: number;
  Title?: string;
  Detail?: string;

  MemberID?: number;
  Member?: MemberInterface;
}
