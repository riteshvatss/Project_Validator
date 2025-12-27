import Appbar from "../Components/Appbar";
import Project_Section from "../Components/Projects_Section";
import Validator_Hero from "../Components/Validator_Hero";


function ValidatorPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-15%] w-[600px] h-[600px] bg-blue-600/20 blur-[140px] animate-orb1" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px] bg-emerald-600/20 blur-[140px] animate-orb2" />
      </div>
      <Appbar />
      <main className="pt-16">
  <Validator_Hero />

    <Project_Section />


</main>

    </div>
  );
}

export default ValidatorPage;
