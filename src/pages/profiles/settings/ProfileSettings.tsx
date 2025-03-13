import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { ProfileType } from "../../../utils/types/profileType";
import Page from "../../../components/Page";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  TextField,
  InputAdornment,
  styled,
} from "@mui/material";
import { ImagePlusIcon, PenLineIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { InstrumentType } from "../../../utils/types/instrumentTypes";
import ResetPassword from "./ResetPassword";
import { ToastContext } from "../../providers/toastContext";
import InstrumentsSelect from "./InstrumentsSelect";
import ProfileAvatar from "../../../components/ProfileAvatar";

interface Form extends HTMLFormElement {
  username: HTMLInputElement;
  email: HTMLInputElement;
  description: HTMLInputElement;
}

export default function ProfileSettings() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const formRef = useRef<Form>(null);
  const { toggleToast } = useContext(ToastContext);

  const navigate = useNavigate();
  const [instruments, setInstruments] = useState<number[] | undefined>(
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
  const [profilePicture, setProfilePicture] = useState<string | undefined>("");

  useEffect(() => {
    fetch(`${BASE_URL}/user/@me`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.message) {
          setProfile(data);
          const current_instruments: number[] = [];
          data.instruments.forEach((instrument: InstrumentType) => {
            return current_instruments.push(instrument.id);
          });
          setInstruments(current_instruments);
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
        instruments: instruments,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.id, name: data.name })
        );
      });

    toggleToast({
      title: "Profile",
      description: "successfully updated !",
    });
    return navigate("/");
  };

  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Page>
      <form
        ref={formRef}
        className=" bg-white border p-4  mt-4 grid gap-4 w-full items-center max-w-[500px]"
      >
        <div className="grid sm:grid-cols-[min-content,1fr] gap-4">
          <div className="relative p-4 border w-fit mx-auto border-gray-400 hover:border-black rounded">
            <ProfileAvatar
              profile_picture={profilePicture}
              name={profile?.name}
              size="large"
            />
            <Button
              component="label"
              sx={{
                position: "absolute",
                padding: 0,
                justifyContent: "end",
              }}
              className=" bottom-0 right-0"
            >
              <ImagePlusIcon className=" m-2" />
              <VisuallyHiddenInput type="file" onChange={(e) => uploadImg(e)} />
            </Button>
          </div>

          <div className=" grid gap-4">
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
          </div>
        </div>

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
          <InstrumentsSelect
            instruments={instruments}
            setInstruments={(new_instruments_list) =>
              setInstruments(new_instruments_list)
            }
          />
        )}
        <ResetPassword user_id={profile.id} />
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
