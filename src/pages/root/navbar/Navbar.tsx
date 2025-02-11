import MediaQuery from "react-responsive";
import BrowserNavbar from "./BrowserNavbar";
import MobileNavBar from "./MobileNavBar";

export default function Navbar() {
  return (
    <>
      <MediaQuery minWidth={1224}>
        <BrowserNavbar />
      </MediaQuery>
      <MediaQuery maxWidth={1224}>
        <MobileNavBar />
      </MediaQuery>
    </>
  );
}
