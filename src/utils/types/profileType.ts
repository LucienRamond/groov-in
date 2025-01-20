import { BandType } from "./band";

export interface ProfileType {
  id: number;
  name: string;
  email: string;
  bands: BandType[];
}
