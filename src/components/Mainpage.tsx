import KidsSection from "./KidsSection";

import HomePage from "../pages/HomePage";

import Newsletter from "./newletter/Newsletter";

export default function MainPage() {
  return (
    <>
      <main>
        <HomePage />
        <KidsSection />
        <Newsletter />
      </main>
    </>
  );
}
