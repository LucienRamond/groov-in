import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

export default function ProfileAvatar({
  name,
  size,
  image,
}: {
  name?: string;
  size?: string;
  image?: string;
}) {
  const [avatarSize, setAvatarSize] = useState<string>("100px");
  const [fontSize, setFontSize] = useState<string>("3rem");

  useEffect(() => {
    switch (size) {
      case "small":
        setAvatarSize("25px");
        setFontSize("1rem");
        break;
      case "medium":
        setAvatarSize("100px");
        setFontSize("3rem");
        break;
      case "large":
        setAvatarSize("150px");
        setFontSize("5rem");
        break;
    }
  }, [size]);

  return (
    <Avatar
      sx={{
        width: `${avatarSize}`,
        height: `${avatarSize}`,
        bgcolor: "var(--color)",
        fontSize: `${fontSize}`,
        color: "var(--secondary-background-color)",
        fontWeight: "bold",
        border: "2px solid",
      }}
    >
      {image ? (
        <img
          className=" object-cover overflow-hidden h-full min-w-full"
          src={image}
        />
      ) : (
        name?.charAt(0)
      )}
    </Avatar>
  );
}
