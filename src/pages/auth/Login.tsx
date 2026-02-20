import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Page from "../../components/Page";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../providers/user/UserContext";

interface Form extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function Login() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const formRef = useRef<Form>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setUser } = useContext(UserContext);

  const handleForm = () => {
    const form = formRef.current as Form;
    if (!form.email.value || !form.password.value) {
      return;
    }

    setErrorMessage(null);

    fetch(`${BASE_URL}/user/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          return setErrorMessage(data.message);
        }
        setUser(data);
        navigate("/");
      });
  };

  return (
    <Page>
      <form
        ref={formRef}
        className=" bg-white border p-4 mt-4 grid gap-4 w-full items-center max-w-[500px]"
      >
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
          Login
        </Button>
      </form>
    </Page>
  );
}
