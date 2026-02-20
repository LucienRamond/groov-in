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
    <Page>
      <div className=" p-2 w-full grid grid-cols-1 justify-items-center md:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
        {profiles.map((profile: ProfileType) => {
          return <ProfileComponent key={profile.id} id={profile.id} />;
        })}
      </div>
    </Page>
  );
}
