import { BandType } from "./bandTypes";

export interface ProfileType {
  id: number;
  name: string;
  email: string;
  bands: BandType[];
}
