import { useEffect, useRef, useState } from "react";
import Page from "../../components/Page";
import { BandType } from "../../utils/types/bandTypes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useNavigate } from "react-router";
import BandComponent from "../../components/BandComponent";

interface Form extends HTMLFormElement {
  band_name: HTMLInputElement;
}

export default function MyBands() {
  const [bands, setBands] = useState<Array<BandType>>([]);
  const navigate = useNavigate();
  const [onCreatingBand, setOnCreatingBand] = useState<boolean>(false);
  const formRef = useRef<Form>(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleClose = () => {
    setOnCreatingBand(false);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/bands/my-bands`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => !data.message && setBands(data));
  }, [BASE_URL]);

  const createBand = () => {
    const form = formRef.current as Form;
    console.log(form.band_name.value);

    fetch(`${BASE_URL}/bands/create`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.band_name.value,
      }),
    })
      .then((response) => response.json())
      .then(() => navigate("/bands/my-bands"));
  };

  return (
    <Page
      title={`You're playing in ${bands.length} band${
        bands.length > 1 ? "s" : ""
      } !`}
    >
      <div className=" grid grid-cols-2 gap-2 mt-2">
        {bands.map((band) => {
          return <BandComponent key={band.id} id={band.id} />;
        })}
        <Button
          className=" w-[250px] col-span-2 justify-self-center"
          variant="contained"
          onClick={() => setOnCreatingBand(true)}
        >
          Create a band
        </Button>
      </div>

      <Dialog
        open={onCreatingBand}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          ref: formRef,
          onSubmit: (event: Event) => {
            event.preventDefault();
            createBand();
            handleClose();
          },
        }}
      >
        <DialogTitle>Create a Band</DialogTitle>
        <DialogContent className=" grid gap-4">
          <DialogContentText>
            Enter the name of your band, select the leader and finally add the
            members from your friends.
          </DialogContentText>
          <FormControl>
            <InputLabel htmlFor="band_name">Band name</InputLabel>
            <OutlinedInput
              fullWidth
              id="band_name"
              label="Band name"
              type="text"
              required
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}
