import { useParams } from "react-router-dom";
import Appbar from "../Components/Appbar";
import { useTask } from "../hooks";
import { Project_Card } from "../Components/projectsSkelton";

function ValidatorProjectPage() {
  const { id, loc } = useParams();
  const isVal = loc === "true";
  const { task } = useTask(id, "validator");

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Appbar />
        <div className="pt-40 text-center text-gray-400 animate-fadeIn">
          Loading project…
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">

      {/* Ambient background — same system as other pages */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-25%] left-[-15%] w-[600px] h-[600px] bg-blue-600/20 blur-[140px] animate-orb1" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[600px] h-[600px] bg-emerald-600/20 blur-[140px] animate-orb2" />
      </div>

      <Appbar />

      <main className="pt-28 pb-12 animate-page-enter">
        <div className="text-center mb-8 animate-textReveal">
          <h2 className="
            text-3xl sm:text-4xl md:text-5xl
            font-extrabold text-white font-['Poppins']
            bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-500
            bg-clip-text text-transparent
          ">
            Project Validation
          </h2>

          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Review the project carefully and provide constructive feedback.
          </p>
        </div>
        <section className="animate-section-enter">
          <Project_Card
            key={task.id}
            task={task}
            isVal={isVal}
          />
        </section>

      </main>
    </div>
  );
}

export default ValidatorProjectPage;
