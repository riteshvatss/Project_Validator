import { useParams } from "react-router-dom";
import Appbar from "../Components/Appbar";
import { useTask } from "../hooks";
import { Project_Card } from "../Components/projectsSkelton";

function DeveloperprojectPage() {
  const { id } = useParams();
  const { task } = useTask(id, "developer");

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
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-25%] left-[-15%] w-[600px] h-[600px] bg-purple-600/20 blur-[140px] animate-orb1" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[600px] h-[600px] bg-blue-600/20 blur-[140px] animate-orb2" />
      </div>

      <Appbar />

      <main className="pt-28 pb-24 animate-page-enter">
        <div className="text-center mb-16 animate-textReveal">
          <h2 className="
            text-3xl sm:text-4xl md:text-5xl
            font-extrabold text-white font-['Poppins']
            bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500
            bg-clip-text text-transparent
          ">
            Project Details
          </h2>

          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Review your project exactly as the community sees it.
          </p>
        </div>

        {/* Spotlighted project */}
        <section className="animate-section-enter">
          <Project_Card
            key={task.id}
            task={task}
            isVal={false}
          />
        </section>

      </main>
    </div>
  );
}

export default DeveloperprojectPage;
