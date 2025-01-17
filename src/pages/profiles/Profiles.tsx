import { useEffect, useState } from "react";
import Page from "../../components/Page";
import { Profile } from "../../utils/types/profile";

export default function Profiles() {
  const [profiles, setProfiles] = useState<Array<Profile>>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => setProfiles(data));
  }, [BASE_URL]);

  return (
    <Page title="Profiles">
      <div>
        {profiles.map((profile) => {
          return <div>{profile.name}</div>;
        })}
      </div>
    </Page>
  );
}
