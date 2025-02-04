import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { InstrumentType } from "../../../utils/types/instrumentTypes";

function not(a: readonly InstrumentType[], b: readonly InstrumentType[]) {
  return a.filter((value) => !b.includes(value));
}

function intersection(
  a: readonly InstrumentType[],
  b: readonly InstrumentType[]
) {
  return a.filter((value) => b.includes(value));
}

type InstrumentsTransferListType = {
  // setProfile: () => void;
  instruments: InstrumentType[];
};

export default function InstrumentsTransferList({
  // setInstruments,
  instruments,
}: InstrumentsTransferListType) {
  const [checked, setChecked] = useState<readonly InstrumentType[]>([]);
  const [left, setLeft] = useState<readonly InstrumentType[]>([]);
  const [right, setRight] = useState<readonly InstrumentType[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    fetch(`${BASE_URL}/instruments`)
      .then((response) => response.json())
      .then((data) => {
        setLeft(data);
        setRight(instruments);
      });
  }, [BASE_URL, instruments]);

  console.log("ok");

  const handleToggle = (value: InstrumentType) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items: readonly InstrumentType[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value: InstrumentType) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItemButton
              key={value.id}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid>{customList(left)}</Grid>
      <Grid>
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid>{customList(right)}</Grid>
    </Grid>
  );
}
