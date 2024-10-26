// layout.tsx

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React, { useEffect, useState } from 'react';
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

  // État pour savoir si le composant est monté
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Une fois monté, mettez à jour l'état
  }, []);

  return (
    <ChakraProvider>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <header>
            <h1>Mon site NFT</h1>
            <nav>
              <a href="/">Accueil</a>
              <a href="/my-nfts">Mes NFTs</a>
              <a href="/gallery">Galerie</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <p>&copy; 2024 Mon site NFT</p>
          </footer>
          {/* Affiche le bouton de connexion au wallet uniquement après le montage */}
          {mounted && <WalletMultiButton />}
        </WalletModalProvider>
      </WalletProvider>
    </ChakraProvider>
  );
};

export default Layout;
