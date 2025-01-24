import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Page from "../../components/Page";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

interface Form extends HTMLFormElement {
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  password_check: HTMLInputElement;
}

export default function Register() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const formRef = useRef<Form>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleForm = () => {
    const form = formRef.current as Form;
    if (form.password.value != form.password_check.value) {
      setErrorMessage("Passwords must be the same");
      return;
    }
    setErrorMessage(null);

    fetch(`${BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.username.value,
        email: form.email.value,
        password: form.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        data.message != "Successfully signed up"
          ? setErrorMessage(data.message)
          : navigate("/user/login")
      );
  };

  return (
    <Page title="Register">
      <form
        ref={formRef}
        className=" bg-white border border-black border-t-0 p-4 rounded-xl rounded-t-none grid gap-4 min-w-[500px] items-center"
      >
        <FormControl>
          <InputLabel htmlFor="username">Name</InputLabel>
          <OutlinedInput id="username" label="Name" />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput id="email" label="Email" type="email" required />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            label="Password"
            type="password"
            required
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password_check">Repeat password</InputLabel>
          <OutlinedInput
            id="password_check"
            label="Repeat password"
            type="password"
            required
          />
        </FormControl>
        {errorMessage && (
          <Typography className=" text-red-600 italic underline">
            {errorMessage}
          </Typography>
        )}
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleForm();
          }}
          variant="contained"
        >
          Register
        </Button>
      </form>
    </Page>
  );
}
