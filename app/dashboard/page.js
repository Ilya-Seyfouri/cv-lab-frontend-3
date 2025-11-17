"use client";

import { useState } from "react";
import { GenerationProvider } from "../contexts/GenerationContext";

import CV from "../sections/CV";
import Sidebar from "../sections/Sidebar";
import CoverLetter from "../sections/CoverLetter";
import Home from "../sections/Home";
import Account from "../sections/Account";

export default function Dashboard() {
  // "optimize" shows Home, CV, CoverLetter by default
  const [selectedTab, setSelectedTab] = useState("optimize");

  return (
    <GenerationProvider>
      <Sidebar selectedTab={selectedTab} onSelect={setSelectedTab} />

      {/* Padding so content isn't hidden behind fixed navbar */}
      <main className="pt-24">
        {/* Keep both sections mounted but only display one */}
        <div style={{ display: selectedTab === "account" ? "block" : "none" }}>
          <Account onNavigateToOptimizer={() => setSelectedTab("optimize")} />
        </div>

        <div style={{ display: selectedTab === "optimize" ? "block" : "none" }}>
          <Home />
          <CV />
          <CoverLetter />
        </div>
      </main>
    </GenerationProvider>
  );
}

