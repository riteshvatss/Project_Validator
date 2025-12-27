import { useDevelopertasks } from "../hooks";
import { Projects_Card } from "../Components/projectsSkelton";
import Appbar from "../Components/Appbar";
import { DeveloperDashboardOverview } from "../Components/DashboardOverview";

function DeveloperBulktask() {
  const { developertasks } = useDevelopertasks();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Appbar />

      <main className="pt-24 pb-20 animate-page-enter">
        <section className="animate-section-enter">
          <DeveloperDashboardOverview />
        </section>
        <section className="mt-24 text-center animate-textReveal">
          <h2 className="
            text-4xl sm:text-5xl md:text-6xl
            font-extrabold text-white font-['Poppins']
            bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500
            bg-clip-text text-transparent
          ">
            My Projects
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Your submitted projects, tracked and validated by the community.
          </p>
        </section>
        <section className="
          mt-16 px-4 sm:px-10 md:px-20
       
        ">

          {developertasks.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 animate-fadeIn">
              You haven’t submitted any projects yet.
            </div>
          ) : (
            developertasks.map((task, index) => (
              <div
                key={task.id}
                style={{ animationDelay: `${index * 120}ms` }}
                className="animate-cardReveal"
              >
                <Projects_Card
                  task={task}
                  pathh="/developerProjectIndividual"
                />
              </div>
            ))
          )}
        </section>

      </main>
    </div>
  );
}

export default DeveloperBulktask;
