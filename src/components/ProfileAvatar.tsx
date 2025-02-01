import { Avatar } from "@mui/material";

export default function ProfileAvatar({ name }: { name?: string }) {
  return (
    <Avatar
      sx={{
        width: "100px",
        height: "100px",
        bgcolor: "var(--color)",
        fontSize: "3rem",
        color: "var(--secondary-background-color)",
        fontWeight: "bold",
        border: "2px solid",
      }}
    >
      {name?.charAt(0)}
    </Avatar>
  );
}
