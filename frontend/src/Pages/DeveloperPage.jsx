import AddTask from "../Components/AddTask";
import Appbar from "../Components/Appbar";
import DeveloperHero from "../Components/DeveloperHero";

function DeveloperPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 blur-[140px] animate-orb1" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[140px] animate-orb2" />
      </div>
      <Appbar />
      <main className="pt-10 animate-page-enter">
        <section className="animate-section-enter">
          <DeveloperHero />
        </section>
        <div className="relative my-4 sm:my-12  flex justify-center">
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulseSlow" />
        </div>
        <section className="animate-section-enter">
          <AddTask />
        </section>
      </main>
    </div>
  );
}

export default DeveloperPage;
