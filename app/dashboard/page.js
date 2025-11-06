import CV from "../sections/CV";
import Sidebar from "../sections/Sidebar";
import Details from "../sections/Details";
import CoverLetter from "../sections/CoverLetter";
import Home from "../sections/Home";
import Billing from "../sections/Billing";

export default function Dashboard() {
  return (
    // Layout: sidebar + main content area
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content (scrollable) */}
      <main className="flex-1 p-6">
        {/* Top sections */}
        <div className="space-y-10">
          <Home />
          <CV />
          <CoverLetter />
        </div>

        {/* Billing + Details below */}
        <div className="mt-10 flex flex-col md:flex-row gap-6 items-stretch">
          <div className="w-full md:w-1/2">
            <Billing />
          </div>

          <div className="w-full md:w-1/2">
            <Details />
          </div>
        </div>
      </main>
    </div>
  );
}
