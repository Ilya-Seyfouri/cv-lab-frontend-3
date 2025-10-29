import CV from "../sections/CV";
import Sidebar from "../sections/Sidebar";
import Details from "../sections/Details";
import CoverLetter from "../sections/CoverLetter";
import Home from "../sections/Home";
import Billing from "../sections/Billing";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <Billing />
      <Home />
      <CV />
      <CoverLetter />
      <Details />
    </>
  );
}
