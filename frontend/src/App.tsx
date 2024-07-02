import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/atomics";
import { Navbar } from "@/components/molecules";
import { Toaster } from "@/components/ui/toaster";

import { Home } from "@/pages";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="px-4 sm:px-14 mx-auto max-w-screen-xl">
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
