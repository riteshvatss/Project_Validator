import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";

function HeroSection() {
    const navigate = useNavigate();
    const { publicKey } = useWallet();

    return (
        <div className="relative overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-purple-950 to-black animate-gradientMove" />
            <div className="absolute top-32 left-24 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-floatSlow" />
            <div className="absolute bottom-24 right-24 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-floatSlow delay-200" />
            <div className="text-center px-4 sm:px-16 md:px-44">
                <h1 className="
                    text-4xl sm:text-5xl md:text-7xl font-extrabold
                    bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400
                    bg-clip-text text-transparent
                    animate-textReveal
                    drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]
                ">
                    Showcase Projects. Validate Projects.
                    <span className="block">The Web3 Way.</span>
                </h1>
                <p className="
                    mt-6 text-lg sm:text-xl text-gray-300
                    max-w-4xl mx-auto
                    animate-fadeIn delay-300
                ">
                    Developers share their work. Validators provide feedback.
                    Developers earn credibility, Validators earn Solana.
                    Let’s build an undefeatable Web3 community.
                </p>
                <div className=" 
                    mt-10 flex flex-col sm:flex-row justify-center gap-6
                    animate-fadeIn delay-500
                ">
                    <button
                        className="
                            relative overflow-hidden
                            w-full sm:w-56 h-14 rounded-xl
                            bg-gradient-to-r from-blue-500 to-cyan-400
                            text-white font-semibold text-lg
                            shadow-[0_0_30px_rgba(59,130,246,0.6)]
                            transition-all duration-300
                            hover:scale-110 active:scale-95
                        "
                        onClick={
                            !publicKey
                                ? () =><div className="mt-40">{alert("Please Connect to the wallet")}</div>
                                : () => navigate("/developerPage")
                        }
                    >
                        <span className="relative z-10">I am a Developer</span>
                        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
                    </button>

                    <button
                        className="
                            relative overflow-hidden
                            w-full sm:w-56 h-14 rounded-xl
                            bg-gradient-to-r from-green-500 to-emerald-400
                            text-white font-semibold text-lg
                            shadow-[0_0_30px_rgba(34,197,94,0.6)]
                            transition-all duration-300
                            hover:scale-110 active:scale-95
                        "
                        onClick={
                            !publicKey
                                ? () => alert("Please Connect to the wallet")
                                : () => navigate("/validatorPage")
                        }
                    >
                        <span className="relative z-10">I am a Validator</span>
                        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
                    </button>
                 
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
