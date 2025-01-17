import { Profile } from "./profile";

export interface Band {
  id: number;
  name: string;
  created_by: Profile;
  members: Profile[];
}
