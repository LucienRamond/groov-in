import { ProfileType } from "./profileType";

export interface BandType {
  id: number;
  name: string;
  description: string;
  created_by: [
    {
      id: number;
      name: string;
    }
  ];
  members: ProfileType[];
}
