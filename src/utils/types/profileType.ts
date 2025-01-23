import { BandType } from "./bandTypes";

export interface ProfileType {
  id: number;
  name: string;
  description: string;
  email: string;
  bands: BandType[];
}
