import { BandType } from "./bandTypes";
import { InstrumentType } from "./instrumentTypes";

export interface ProfileType {
  id: number;
  name: string;
  description: string;
  instruments: InstrumentType[];
  email: string;
  bands: BandType[];
}
