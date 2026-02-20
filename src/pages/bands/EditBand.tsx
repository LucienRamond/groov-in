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
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { BandType } from "../../utils/types/bandTypes";
import { ToastContext } from "../providers/toast/toastContext";

interface Form extends HTMLFormElement {
  band_name: HTMLInputElement;
  band_description: HTMLInputElement;
}
export default function EditBand({ band_data }: { band_data?: BandType }) {
  const [onEditBand, setOnEditBand] = useState(false);
  const [onDeleteBand, setOnDeleteBand] = useState(false);
  const { toggleToast } = useContext(ToastContext);

  const [band, setBand] = useState<BandType>({
    id: 0,
    name: "Name",
    description: "description",
    created_by: [
      {
        id: 0,
        name: "name",
      },
    ],
    members: [],
  });
  const formRef = useRef<Form>(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    return band_data && setBand(band_data);
  }, [band_data]);

  const editBand = () => {
    const form = formRef.current as Form;

    fetch(`${BASE_URL}/bands/edit`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: band.id,
        name: form.band_name.value,
        description: form.band_description.value,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        toggleToast({
          title: "Band",
          description: "successfully updated !",
        });
        navigate(`/bands/${band.id}`);
      });
  };

  const deleteBand = () => {
    fetch(`${BASE_URL}/bands/delete/${band.id}`, {
      credentials: "include",
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        toggleToast({
          title: "Band",
          description: "successfully deleted !",
        });
        navigate(`/`);
      });
  };

  return (
    <>
      <Button
        size="small"
        color="error"
        variant="outlined"
        onClick={() => {
          setOnEditBand(true);
        }}
      >
        Edit band
      </Button>

      <Dialog
        open={onEditBand}
        onClose={() => setOnEditBand(false)}
        PaperProps={{
          component: "form",
          className: "min-w-[500px]",
          ref: formRef,
          onSubmit: (event: Event) => {
            event.preventDefault();
            editBand();
          },
        }}
      >
        <DialogTitle>Edit {band_data?.name}</DialogTitle>
        <DialogContent className=" grid gap-4">
          <DialogContentText>
            Edit your band name, description then confirm.
          </DialogContentText>
          <FormControl>
            <InputLabel htmlFor="band_name">Band name</InputLabel>
            <OutlinedInput
              fullWidth
              slotProps={{ input: { maxLength: 50 } }}
              id="band_name"
              label="Band name"
              type="text"
              value={band?.name}
              onChange={(e) => setBand({ ...band, name: e.target.value })}
              required
            />
          </FormControl>
          <FormControl>
            <TextField
              id="band_description"
              label="Band description"
              slotProps={{ htmlInput: { maxLength: 255 } }}
              onChange={(e) =>
                setBand({ ...band, description: e.target.value })
              }
              value={band?.description}
              helperText="Maximum 255 characters"
              minRows={3}
              maxRows={6}
              multiline
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={() => setOnDeleteBand(true)}
          >
            Delete band
          </Button>
          <Dialog open={onDeleteBand} onClose={() => setOnDeleteBand(false)}>
            <DialogTitle className=" min-w-[400px]">
              Delete {band.name}
            </DialogTitle>
            <DialogContent>
              By Deleting a band, you will no longer be able to recover it !
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => setOnDeleteBand(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={deleteBand}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </DialogActions>
        <DialogActions>
          <Button variant="contained" onClick={() => setOnEditBand(false)}>
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
