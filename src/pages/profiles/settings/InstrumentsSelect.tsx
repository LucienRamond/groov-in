import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { InstrumentType } from "../../../utils/types/instrumentTypes";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function InstrumentsSelect({
  instruments,
  setInstruments,
}: {
  instruments: number[];
  setInstruments: (new_instruments_list: number[]) => void;
}) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [allInstruments, setAllIsntruments] = useState<InstrumentType[]>([]);

  useEffect(() => {
    setInstruments([]);
    fetch(`${BASE_URL}/instruments`)
      .then((response) => response.json())
      .then((data) => {
        setAllIsntruments(data);
      });
    setInstruments(instruments);
  }, [BASE_URL, instruments, setInstruments]);

  const handleChange = (event: SelectChangeEvent<typeof instruments>) => {
    const {
      target: { value },
    } = event;
    setInstruments(value as number[]);
  };

  return (
    <div>
      <FormControl className=" w-full">
        <InputLabel id="select-instruments-label">Instruments</InputLabel>
        <Select
          labelId="select-instruments-label"
          id="select-instruments"
          multiple
          value={instruments}
          onChange={handleChange}
          input={<OutlinedInput label="Instruments" />}
          renderValue={(selected) => {
            const render_value: string[] = [];
            for (const select of selected) {
              allInstruments.forEach((instru) => {
                return instru.id === select && render_value.push(instru.name);
              });
            }

            return render_value.join(", ");
          }}
          MenuProps={MenuProps}
        >
          {allInstruments.map((instrument) => (
            <MenuItem key={instrument.id} value={instrument.id}>
              <Checkbox
                checked={instruments.some((e) => e === instrument.id) && true}
              />
              <ListItemText primary={instrument.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
