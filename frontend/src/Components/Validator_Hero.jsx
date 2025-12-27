import { useNavigate } from "react-router-dom";

function Validator_Hero() {
  const hero_Image = import.meta.env.VITE_HERO_IMAGE;
  const navigate = useNavigate();

  return (
    <div className="relative pt-20 sm:pt-28 md:pt-36 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full animate-orb1" />
      <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-emerald-600/20 blur-3xl rounded-full animate-orb2" />

      <div className="
        relative grid grid-cols-1 sm:grid-cols-2
        mx-4 sm:mx-8 md:mx-12
        px-4 sm:px-6
        rounded-3xl
        border border-purple-500/30
        bg-gray-950/80 backdrop-blur-xl
        shadow-[0_0_60px_rgba(168,85,247,0.2)]
        animate-section-enter
        
      ">
        <div className="pt-10 sm:pt-16 md:pt-28 px-2 sm:px-4 md:pl-8">

          <h1 className="
            text-white font-serif
            text-3xl sm:text-4xl md:text-5xl
            font-extrabold leading-tight
            animate-textReveal
          ">
            Ideas don’t change the world{" "}
            <span className="
              inline-block
              bg-gradient-to-r from-purple-400 to-blue-500
              bg-clip-text text-transparent
              text-4xl sm:text-5xl md:text-6xl
              drop-shadow-[0_0_25px_rgba(99,102,241,0.7)]
              animate-gradientText
            ">
              Validators Do
            </span>
          </h1>

          <p className="
            mt-4 max-w-xl
            text-base sm:text-xl md:text-2xl
            text-gray-300
            animate-fadeIn delay-150
          ">
            Your insights refine ideas, empower developers, and build an unstoppable community.
          </p>
          <div className="pt-8 sm:pt-10 animate-fadeIn delay-300">
            <button
              onClick={() => navigate("/validatorBulkTask")}
              className="
                relative overflow-hidden
                px-6 py-3
                bg-gradient-to-r from-blue-500 to-purple-600
                text-white text-base sm:text-lg font-semibold
                rounded-xl
                shadow-[0_0_30px_rgba(99,102,241,0.6)]
                transition-all duration-300
                hover:scale-110 hover:shadow-[0_0_50px_rgba(99,102,241,0.9)]
                active:scale-95
              "
            >
              <span className="relative z-10">My Dashboard</span>
              <span className="
                absolute inset-0
                bg-white/20
                translate-x-[-120%]
                hover:translate-x-[120%]
                transition-transform duration-700
              " />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center pt-10 sm:pt-16">
          <img
            src={hero_Image}
            alt="Validator Hero"
            className="
              w-full
              max-h-[420px] sm:max-h-[480px] md:max-h-[520px]
              object-contain
              rounded-3xl
              animate-imageFloat
              md:scale-95 lg:scale-90
              drop-shadow-[0_0_40px_rgba(168,85,247,0.35)]
            "
          />
        </div>

      </div>
    </div>
  );
}

export default Validator_Hero;
