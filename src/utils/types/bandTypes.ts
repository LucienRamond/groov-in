import { ProfileType } from "./profileType";

export interface BandType {
  id: number;
  name: string;
  created_by: [
    {
      id: number;
      name: string;
    }
  ];
  members: ProfileType[];
}
