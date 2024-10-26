// layout.tsx

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'; // Ajoutez cette ligne
import React from 'react';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ChakraProvider } from '@chakra-ui/react';
import { useMemo } from 'react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolletWalletAdapter } from '@solana/wallet-adapter-sollet';
import { UmiProvider } from '../utils/UmiProvider';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Configuration des wallets
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolletWalletAdapter(),
    // Ajoutez d'autres wallets si nécessaire
  ], []);

  return (
    <ChakraProvider>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <header>
            <h1>Mon site NFT</h1>
            <nav>
              <a href="/">Accueil</a>
              <a href="/gallery">Mes NFTs</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <p>&copy; 2024 Mon site NFT</p>
          </footer>
          {/* Affiche le bouton de connexion au wallet */}
          <div>
            <WalletMultiButton /> {/* Utilisation du bouton de multi-wallet */}
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ChakraProvider>
  );
};

export default Layout;
