import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/atomics";
import { Navbar } from "@/components/molecules";
import { Toaster } from "@/components/ui/toaster";

import { Home } from "@/pages";

export default function App() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="mx-auto max-w-screen-xl">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      {/* FOOTER */}
      <Footer />
      <Toaster />
    </div>
  );
}
