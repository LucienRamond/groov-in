import { Button } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [groove, setGroove] = useState(false);
  return (
    <div className={`grid gap-20`}>
      <h1 className={`${groove && "animate-spin"}`}>Goov'in</h1>
      <Button onClick={() => setGroove(!groove)} variant="contained">
        Let's groove !
      </Button>
    </div>
  );
}
