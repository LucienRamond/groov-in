import { useEffect, useRef, useState } from "react";
import { ProfileType } from "../../../utils/types/profileType";
import Page from "../../../components/Page";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { PenLineIcon } from "lucide-react";
import { useNavigate } from "react-router";
import InstrumentsTransferList from "./InstrumentsTransferList";
import { InstrumentType } from "../../../utils/types/instrumentTypes";

interface Form extends HTMLFormElement {
  username: HTMLInputElement;
  email: HTMLInputElement;
  description: HTMLInputElement;
}

export default function ProfileSettings() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const formRef = useRef<Form>(null);
  const navigate = useNavigate();
  const [instruments, setInstruments] = useState<InstrumentType[] | undefined>(
    undefined
  );
  const [profile, setProfile] = useState<ProfileType>({
    id: 0,
    name: "Name",
    description: "Description",
    instruments: [],
    email: "Email",
    bands: [],
  });
  const [updateEmail, setUpdateEmail] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${BASE_URL}/user/@me`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.message) {
          setProfile(data);
          setInstruments(data.instruments);
        }
      });
  }, [BASE_URL]);

  const handleForm = async () => {
    const form = formRef.current as Form;
    fetch(`${BASE_URL}/user/edit`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: profile?.id,
        name: form.username.value,
        email: form.email.value,
        description: form.description.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.id, name: data.name })
        );
        navigate("/");
      });
    return navigate("/");
  };

  return (
    <Page title="Settings">
      <form
        ref={formRef}
        className=" bg-white border border-black border-t-0 p-4 rounded-xl rounded-t-none grid gap-4 min-w-[500px] items-center"
      >
        <FormControl>
          <InputLabel htmlFor="username">Name</InputLabel>
          <OutlinedInput
            id="username"
            label="Name"
            value={profile?.name}
            onChange={(e) =>
              profile && setProfile({ ...profile, name: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            label="Email"
            type="email"
            disabled={!updateEmail}
            required
            value={profile?.email}
            onChange={(e) =>
              profile && setProfile({ ...profile, email: e.target.value })
            }
            endAdornment={
              <InputAdornment position="end">
                <Button
                  onClick={() => setUpdateEmail(!updateEmail)}
                  sx={{ justifyContent: "end" }}
                >
                  <PenLineIcon />
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl>
          <TextField
            id="description"
            label="Profile description"
            slotProps={{ htmlInput: { maxLength: 255 } }}
            helperText="Maximum 255 characters"
            minRows={3}
            maxRows={6}
            value={profile.description ? `${profile?.description}` : ""}
            onChange={(e) =>
              profile && setProfile({ ...profile, description: e.target.value })
            }
            multiline
          />
        </FormControl>
        {instruments && (
          <InstrumentsTransferList
            setInstruments={(new_instruments_list: InstrumentType[]) =>
              setInstruments(new_instruments_list)
            }
            instruments={instruments}
          />
        )}
        <Button
          onClick={(e) => {
            e.preventDefault();
          }}
          variant="outlined"
        >
          Update password
        </Button>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleForm();
          }}
          variant="contained"
        >
          Save
        </Button>
      </form>
    </Page>
  );
}
