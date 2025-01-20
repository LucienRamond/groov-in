import { useEffect, useState } from "react";
import Page from "../../components/Page";
import { ProfileType } from "../../utils/types/profileType";
import ProfileComponent from "../../components/ProfileComponent";

export default function Profiles() {
  const [profiles, setProfiles] = useState<Array<ProfileType>>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => setProfiles(data));
  }, [BASE_URL]);

  return (
    <Page title="Profiles">
      <div className="  grid grid-cols-2 gap-2 mt-2">
        {profiles.map((profile: ProfileType) => {
          return <ProfileComponent key={profile.id} profile={profile} />;
        })}
      </div>
    </Page>
  );
}
