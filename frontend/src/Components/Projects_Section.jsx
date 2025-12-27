import { Projects_Card } from "./projectsSkelton";
import { useVlaidatortasks } from "../hooks";

function Project_Section() {
  const { validatortasks } = useVlaidatortasks(true);

  return (
    <section className="relative py-20 sm:py-24 md:py-28 animate-page-enter">
      <div className="">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] animate-orb1" />
      </div>
      <h2 className="
        text-center text-4xl sm:text-5xl md:text-6xl
        font-extrabold text-white font-['Poppins']
        bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500
        bg-clip-text text-transparent
        animate-textReveal
      ">
        Queued for Validation
      </h2>
      <p className="
        mt-4 text-center text-gray-400
        max-w-2xl mx-auto
        animate-fadeIn delay-150
      ">
        Projects waiting for community review. Validate, rate, and help surface the best work.
      </p>
      <div className="
        mt-14 px-4 sm:px-10 md:px-10
        
      ">

        {validatortasks.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 animate-fadeIn">
            No projects in queue right now.
          </div>
        ) : (
          validatortasks.map((task, index) => (
            <div
              key={task.id}
              style={{ animationDelay: `${index * 120}ms` }}
              className="animate-cardReveal drop-shadow-[0_0_40px_rgba(168,85,247,0.35)]"
            >
              <Projects_Card
                task={task}
                pathh="/validatorProjectIndividual"
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Project_Section;
