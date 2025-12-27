import { useVlaidatortasks } from "../hooks";
import { Projects_Card } from "../Components/projectsSkelton";
import Appbar from "../Components/Appbar";
import { ValidatorDashboardOverview } from "../Components/DashboardOverview";

function ValidatorBulkTask() {
  const { validatortasks } = useVlaidatortasks(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Appbar />

      <main className="pt-24 pb-20 animate-page-enter">
        <section className="animate-section-enter">
          <ValidatorDashboardOverview />
        </section>
        <section className="mt-24 text-center animate-textReveal">
          <h2 className="
            text-4xl sm:text-5xl md:text-6xl
            font-extrabold text-white font-['Poppins']
            bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500
            bg-clip-text text-transparent
          ">
            Validation History
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Projects you’ve reviewed and helped improve.
          </p>
        </section>
        <section className="
          mt-16 px-4 sm:px-10 md:px-20
          
        ">
          {validatortasks.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 animate-fadeIn">
              You haven’t validated any projects yet.
            </div>
          ) : (
            validatortasks.map((task, index) => (
              <div
                key={task.id}
                style={{ animationDelay: `${index * 120}ms` }}
                className="animate-cardReveal"
              >
                <Projects_Card
                  task={task}
                  pathh="/validatorProjectIndividual"
                />
              </div>
            ))
          )}

        </section>

      </main>
    </div>
  );
}

export default ValidatorBulkTask;
