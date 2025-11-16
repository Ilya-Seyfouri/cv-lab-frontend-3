"use client";

import { useState } from "react";

import CV from "../sections/CV";
import Sidebar from "../sections/Sidebar";
import Details from "../sections/Details"; // safe to delete if unused
import CoverLetter from "../sections/CoverLetter";
import Home from "../sections/Home";
import Billing from "../sections/Billing"; // safe to delete if unused
import Account from "../sections/Account";

export default function Dashboard() {
  // "optimize" shows Home, CV, CoverLetter by default
  const [selectedTab, setSelectedTab] = useState("optimize");

  return (
    <>
      <Sidebar selectedTab={selectedTab} onSelect={setSelectedTab} />

      {/* Padding so content isn't hidden behind fixed navbar */}
      <main className="pt-24">
        {selectedTab === "account" && (
          <>
            <Account />
          </>
        )}

        {selectedTab === "optimize" && (
          <>
            <Home />
            <CV />
            <CoverLetter />
          </>
        )}
      </main>
    </>
  );
}
