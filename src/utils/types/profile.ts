import { Band } from "./band";

export interface Profile {
  id: number;
  name: string;
  email: string;
  bands: Band[];
}
