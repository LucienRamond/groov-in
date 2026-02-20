import { useContext, useEffect, useRef, useState } from "react";
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
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router";
import BandComponent from "../../components/BandComponent";
import { ToastContext } from "../providers/toast/toastContext";

interface Form extends HTMLFormElement {
  band_name: HTMLInputElement;
  band_description: HTMLInputElement;
}

export default function MyBands() {
  const [bands, setBands] = useState<Array<BandType>>([]);
  const { toggleToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [onCreatingBand, setOnCreatingBand] = useState<boolean>(false);
  const formRef = useRef<Form>(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const user = localStorage.getItem("user");

  const handleClose = () => {
    setOnCreatingBand(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/user/login");
    }
    fetch(`${BASE_URL}/bands/my-bands`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => !data.message && setBands(data));
  }, [BASE_URL, navigate]);

  const createBand = () => {
    const form = formRef.current as Form;

    fetch(`${BASE_URL}/bands/create`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.band_name.value,
        description: form.band_description.value,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        toggleToast({ title: "Band", description: "successfully created !" });
        navigate("/my-bands");
      });
  };

  const isEditable = (creator_id: number) => {
    if (!user) {
      return false;
    }
    if (JSON.parse(user).id == creator_id) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Page>
      <div className=" grid grid-cols-2 gap-2 mt-2">
        {bands.map((band) => {
          return (
            <BandComponent
              key={band.id}
              id={band.id}
              edit={isEditable(band.created_by[0].id)}
            />
          );
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
              slotProps={{ input: { maxLength: 50 } }}
              id="band_name"
              label="Band name"
              type="text"
              required
            />
          </FormControl>
          <FormControl>
            <TextField
              id="band_description"
              label="Band description"
              slotProps={{ htmlInput: { maxLength: 255 } }}
              helperText="Maximum 255 characters"
              minRows={3}
              maxRows={6}
              multiline
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
