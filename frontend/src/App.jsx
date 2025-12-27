import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './Pages/LandingPage';
import ValidatorPage from './Pages/ValidatorPage';
import DeveloperPage from './Pages/DeveloperPage';

import DeveloperBulktask from './Pages/DeveloperBulktask';
import ValidatorBulkTask from './Pages/ValidatorBulktask';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
// /import { Router } from 'express';
import ValidatorProjectPage from './Pages/ValidatorProjectPage';
import DeveloperprojectPage from './Pages/DeveloperProjectPage';


function App(){

   const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const wallets = [];

  return<div>
     <BrowserRouter>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            
           
                <Routes>
                  <Route path="/" element={<LandingPage/>}></Route>
                  <Route path="/validatorPage" element={<ValidatorPage/>}></Route>
                  <Route path="/developerPage" element={<DeveloperPage/>}></Route>
                  <Route path="/developerBulkTask" element={<DeveloperBulktask/>}></Route>
                  <Route path="/validatorBulkTask" element={<ValidatorBulkTask/>}></Route>
                  <Route path="/validatorProjectIndividual/:id/:loc" element={<ValidatorProjectPage/>}></Route>
                   <Route path="/developerProjectIndividual/:id/:loc" element={<DeveloperprojectPage/>}></Route>
                  
                </Routes>
                
        
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
     </BrowserRouter>
       

    </div>

  
}

export default App;