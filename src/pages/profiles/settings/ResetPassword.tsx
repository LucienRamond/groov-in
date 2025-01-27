import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

interface Form extends HTMLFormElement {
  old_password: HTMLInputElement;
  new_password: HTMLInputElement;
  new_password_check: HTMLInputElement;
}
export default function ResetPassword({ user_id }: { user_id: number }) {
  const [onResetPassword, setOnResetPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [oldPasswordError, setOldPasswordError] = useState<string | null>(null);
  const formRef = useRef<Form>(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleClose = () => {
    setOnResetPassword(false);
  };

  const ResetPassword = () => {
    const form = formRef.current as Form;
    setNewPasswordError(null);
    setOldPasswordError(null);

    if (form.new_password.value != form.new_password_check.value) {
      return setNewPasswordError("New passwords must be the same");
    }

    fetch(`${BASE_URL}/user/reset-password`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user_id,
        old_password: form.old_password.value,
        new_password: form.new_password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        data.message == "Successfully updated password"
          ? navigate("/bands/my-bands")
          : setOldPasswordError(data.message)
      );
  };

  return (
    <>
      <Button
        onClick={() => {
          setOnResetPassword(true);
        }}
        variant="outlined"
      >
        Reset password
      </Button>

      <Dialog
        open={onResetPassword}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          className: "min-w-[500px]",
          ref: formRef,
          onSubmit: (event: Event) => {
            event.preventDefault();
            ResetPassword();
          },
        }}
      >
        <DialogTitle>Reset password</DialogTitle>
        <DialogContent className="grid gap-4 ">
          <DialogContentText></DialogContentText>
          <FormControl>
            <InputLabel htmlFor="old_password">Old password</InputLabel>
            <OutlinedInput
              fullWidth
              slotProps={{ input: { maxLength: 50 } }}
              id="old_password"
              label="Old password"
              type="password"
              required
              error={oldPasswordError ? true : false}
            />
            <FormHelperText error>{oldPasswordError}</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="new_password">New password</InputLabel>
            <OutlinedInput
              fullWidth
              slotProps={{ input: { maxLength: 50 } }}
              id="new_password"
              label="New password"
              type="password"
              required
            />
          </FormControl>
          <FormControl>
            <InputLabel
              error={newPasswordError ? true : false}
              htmlFor="new_password_check"
            >
              Confirm new password
            </InputLabel>
            <OutlinedInput
              fullWidth
              slotProps={{ input: { maxLength: 50 } }}
              id="new_password_check"
              label="Confirm new password"
              type="password"
              required
              error={newPasswordError ? true : false}
            />
            <FormHelperText error>{newPasswordError}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
