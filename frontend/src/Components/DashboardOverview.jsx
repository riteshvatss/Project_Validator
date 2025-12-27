import axios from "axios";
import { useEffect, useState } from "react";

 export function DeveloperDashboardOverview() {
    const [dashboard, setDashboard] = useState({});
    const SignUrl = import.meta.env.VITE_URL;

    useEffect(() => {
        axios.get(`${SignUrl}/app/v1/developer/dashboard`, {
            headers: { Authorization: localStorage.getItem("token") }
        }).then(res => setDashboard(res.data))
          .catch(err => alert(err.resposne?.data?.err || "Something went wrong"));
    }, []);

    return (
        <div className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
            gap-6 py-10 px-4 sm:px-10 md:px-20
            text-white animate-fadeUp
        ">

            {[
                { label: "Average Rating", value: (dashboard.Average_score??0).toFixed(2)},
                { label: "Total Projects", value: dashboard.Total_projects },
                { label: "Projects Rating > 3", value: dashboard.ProjectsRating_Above3 },
                { label: "SOL Spent", value: dashboard.Sol_spent>0?(dashboard.Sol_spent/(1000000000)).toFixed(1):0 }
            ].map((item, i) => (
                <div
                    key={i}
                    className="
                        relative group
                        bg-gradient-to-r from-purple-600 to-blue-600 font-semibold border border-purple-500 
                        rounded-2xl p-6
                        shadow-[0_0_40px_rgba(168,85,247,0.25)]
                        transition-all duration-500
                        hover:-translate-y-2 hover:shadow-[0_0_70px_rgba(168,85,247,0.45)]
                        animate-cardFloat
                    "
                >
                    <h1 className="text-center text-sm opacity-80">
                        {item.label}
                    </h1>

                    <div className="
                        mt-2 text-center text-2xl font-bold
                        tracking-wide
                    ">
                        {item.value ?? 0}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ValidatorDashboardOverview() {
    const [dashboard, setDashboard] = useState({});
    const [payout_Amount, setPayout_Amount] = useState();
    const SignUrl = import.meta.env.VITE_URL;

    useEffect(() => {
        axios.get(`${SignUrl}/app/v1/validator/dashboard`, {
            headers: { Authorization: localStorage.getItem("token") }
        }).then(res => setDashboard(res.data))
          .catch(err => alert(err.response?.data?.err || "Something went wrong"));
    }, [payout_Amount]);

    async function getPayout() {
        axios.get(`${SignUrl}/app/v1/validator/payout`, {
            headers: { Authorization: localStorage.getItem("token") }
        }).then(res => {
            alert(res.data.msg);
            setPayout_Amount(0);
        }).catch(err => alert(err.response?.data?.msg || "something went wrong"));
    }

    return (
        <div className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
            gap-6 py-10 px-4 sm:px-10 md:px-20
            text-white animate-fadeUp
        ">
            {[
                { label: "Avg Rating Given", value: (dashboard.Average_score??0).toFixed(2) },
                { label: "Total Projects", value: dashboard.Total_projects },
                { label: "Rating Given > 3", value: dashboard.Projects_Above3 }
            ].map((item, i) => (
                <div
                    key={i}
                    className="
                      bg-gradient-to-r from-purple-600 to-blue-600 font-semibold border border-purple-500 
                        rounded-2xl p-6
                        shadow-[0_0_40px_rgba(168,85,247,0.25)]
                        transition-all duration-500
                        hover:-translate-y-2 hover:shadow-[0_0_70px_rgba(168,85,247,0.45)]
                        animate-cardFloat
                    "
                >
                    <h1 className="text-center text-sm opacity-80">
                        {item.label}
                    </h1>
                    <div className="mt-2 text-center text-2xl font-bold">
                        {item.value ?? 0}
                    </div>
                </div>
            ))}
            <div className="
                bg-gradient-to-r from-purple-600 to-blue-600 font-semibold border border-purple-500 
                rounded-2xl p-6
                shadow-[0_0_40px_rgba(34,197,94,0.25)]
                animate-cardFloat
            ">
                {[
                    ["SOL Earned", (dashboard.sol_Earned>0?(dashboard.sol_Earned/(1000000000)).toFixed(3):0)],
                    ["SOL Withdrawn", (dashboard.sol_Withdrawn>0?(dashboard.sol_Withdrawn/(1000000000)).toFixed(3):0)],
                    ["SOL Withdrawable", (dashboard.sol_Withdrawable>0?(dashboard.sol_Withdrawable/(1000000000)).toFixed(3):0)]
                ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm py-1">
                        <span className="opacity-80">{k}</span>
                        <span className="font-semibold">{v ?? "—"}</span>
                    </div>
                ))}
            </div>
            <button
                onClick={getPayout}
                disabled={dashboard.sol_Withdrawable <= 0}
                className="
                    relative overflow-hidden col-span-1 sm:col-span-2 md:col-span-4
                    mx-auto mt-4
                    px-10 py-4 rounded-xl
                    bg-gradient-to-r from-emerald-600 to-teal-600
                    text-white font-semibold
                    shadow-[0_0_40px_rgba(34,197,94,0.6)]
                    transition-all duration-300
                    hover:scale-105 hover:shadow-[0_0_60px_rgba(34,197,94,0.9)]
                    active:scale-95
                    disabled:opacity-40 disabled:cursor-not-allowed
                "
            >
                ↗ Withdraw SOL ({dashboard.sol_Withdrawable>0?(dashboard.sol_Withdrawable/(1000000000)).toFixed(3):0})
            </button>
        </div>
    );
}
