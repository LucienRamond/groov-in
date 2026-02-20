import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

export default function ProfileAvatar({
  name,
  size,
  profile_picture,
  new_profile_picture,
}: {
  name?: string;
  size?: string;
  profile_picture?: string;
  new_profile_picture?: string;
}) {
  const [avatarSize, setAvatarSize] = useState<string>("100px");
  const [fontSize, setFontSize] = useState<string>("3rem");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

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

  const display_avatar = () => {
    if (new_profile_picture) {
      return (
        <img
          className=" object-cover overflow-hidden h-full min-w-full"
          src={`${new_profile_picture}`}
        />
      );
    } else if (profile_picture) {
      return (
        <img
          className=" object-cover overflow-hidden h-full min-w-full"
          src={`${BASE_URL}/user/avatar/${profile_picture}`}
        />
      );
    } else {
      return name?.charAt(0);
    }
  };

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
      {display_avatar()}
    </Avatar>
  );
}
