import { useEffect, useState } from "react";
import Page from "../../components/Page";
import { BandType } from "../../utils/types/bandTypes";
import BandComponent from "../../components/BandComponent";

export default function Bands() {
  const [bands, setBands] = useState<Array<BandType>>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/bands`)
      .then((response) => response.json())
      .then((data) => !data.message && setBands(data));
  }, [BASE_URL]);

  return (
    <Page>
      {/* TODO add sorting feature and search bar */}
      <div className=" w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
        {bands.map((band) => {
          return <BandComponent key={band.id} id={band.id} />;
        })}
      </div>
    </Page>
  );
}
