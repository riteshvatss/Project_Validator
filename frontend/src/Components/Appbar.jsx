import { Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import bs58 from "bs58"
import { useState } from "react";
import { useEffect } from "react";

function Appbar() {
  const { publicKey, signMessage, connected } = useWallet();
  const SignUrl = import.meta.env.VITE_URL;
   const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function handleSignIn() {
    try {
      if (!publicKey || !signMessage) return;


      const message = new TextEncoder().encode("SIgn in from Project11111");
      const signature = await signMessage(message);
      console.log(signature);
      const res = await axios.post(`${SignUrl}/SignIn`, {
        signature:bs58.encode(signature),
        publicKey: publicKey.toString(),
      });
      setIsLoggedIn(true);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
        alert(err.response.data.err);
    }
  }

    useEffect(() => {
        const token = localStorage.getItem("token");
       
        setIsLoggedIn(!!token);
        


    }, []);

    
  return (
   <div className=" fixed top-0 z-50 w-full backdrop-blur-2xl bg-black/40 border-b border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)] animate-fadeDown "> <div className="flex justify-between items-center px-4 sm:px-8 py-3"> <Link to="/"> <div className=" text-2xl sm:text-3xl font-bold tracking-tight cursor-pointer bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent transition-all duration-300 hover:tracking-wide hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)] "> Project<span className="text-white">-</span>Validator </div> </Link>

        <div className="scale-90 sm:scale-100 flex items-center gap-2">
            <div className="transition-all duration-200 hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(59,130,246,0.6)]">
  <WalletMultiButton />
    </div>
  {(connected && !isLoggedIn) && (
    <button
      onClick={handleSignIn}
      className="px-4 py-2 text-center rounded-lg my-2 bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 hover:scale-110 active:scale-95"
    >
      Sign In
    </button>
  )}
</div>


      </div>
    </div>
  );
}

export default Appbar;
