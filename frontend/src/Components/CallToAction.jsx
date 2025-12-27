function CallToAction() {
    return (
        <div className="relative py-4 sm:py-16 md:py-20 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-3xl rounded-full animate-pulseSlow" />

            <h2 className="
                text-center text-3xl sm:text-4xl md:text-5xl
                font-extrabold text-white font-['Poppins']
                animate-textReveal
            ">
                How It Works
            </h2>

            <div className="
                mt-14 flex flex-col md:flex-row
                items-center justify-center gap-8
                px-4 sm:px-6 md:px-24
            ">
                <div className="
                    relative group
                    w-full md:w-1/3
                    bg-black/60 backdrop-blur-xl
                    rounded-3xl p-8
                    border border-purple-500/30
                    shadow-[0_0_40px_rgba(168,85,247,0.15)]
                    transition-all duration-500
                    hover:-translate-y-4 hover:shadow-[0_0_60px_rgba(168,85,247,0.4)]
                    animate-cardFloat delay-0 
                ">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        <div className="text-3xl text-center font-bold pb-3 text-white">
                            Choose Role
                        </div>
                        <p className="text-center text-gray-400 text-base">
                            Sign in as a Developer to showcase your project or as a
                            Validator to review and rate.
                        </p>
                    </div>
                </div>
                <div className="
                    relative group
                    w-full md:w-1/3
                    bg-black/60 backdrop-blur-xl
                    rounded-3xl p-8
                    border border-pink-500/30
                    shadow-[0_0_40px_rgba(236,72,153,0.15)]
                    transition-all duration-500
                    hover:-translate-y-4 hover:shadow-[0_0_60px_rgba(236,72,153,0.4)]
                    animate-cardFloat delay-0
                ">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        <div className="text-3xl text-center font-bold pb-3 text-white">
                            Engage
                        </div>
                        <p className="text-center text-gray-400 text-base">
                            Developers upload projects. Validators provide trusted
                            feedback and ratings to them.
                        </p>
                    </div>
                </div>
                <div className="
                    relative group
                    w-full md:w-1/3
                    bg-black/60 backdrop-blur-xl
                    rounded-3xl p-8
                    border border-green-500/30
                    shadow-[0_0_40px_rgba(34,197,94,0.15)]
                    transition-all duration-500
                    hover:-translate-y-4 hover:shadow-[0_0_60px_rgba(34,197,94,0.4)]
                    animate-cardFloat delay-0
                ">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        <div className="text-3xl text-center font-bold pb-3 text-white">
                            Earn & Grow
                        </div>
                        <p className="text-center text-gray-400 text-base">
                            Developers gain credibility. Validators earn Solana.
                            The community thrives together.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CallToAction;
