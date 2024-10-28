import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";
import { UmiProvider } from "../utils/UmiProvider";
import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ChakraProvider, Text, Box, Link as ChakraLink } from '@chakra-ui/react'; // Importez ChakraLink ici
import { image, headerText } from 'settings';
import { SolanaTimeProvider } from "@/utils/SolanaTimeContext";
import NextLink from 'next/link'; // Importez NextLink ici
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"; // Import du bouton de connexion au wallet

export default function App({ Component, pageProps }: AppProps) {
  let network = WalletAdapterNetwork.Devnet;
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet-beta" || process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet") {
    network = WalletAdapterNetwork.Mainnet;
  }
  let endpoint = "https://api.devnet.solana.com";
  if (process.env.NEXT_PUBLIC_RPC) {
    endpoint = process.env.NEXT_PUBLIC_RPC;
  }
  const wallets = useMemo(
    () => [],
    []
  );

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={headerText} />
        <meta property="og:description" content="RRRRRRRRRRRRRRRRAAAAAAAAAAAVE" />
        <meta name="description" content="RRRRRRRRRRRRRRRRAAAAAAAAAAAVE" />
        <meta property="og:image" content={image} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{headerText}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <WalletProvider wallets={wallets}>
          <UmiProvider endpoint={endpoint}>
            <WalletModalProvider>
              <SolanaTimeProvider>
                {/* Barre de navigation avec menu et bouton wallet */}
                <Box as="nav" p={4} bg="teal.500" display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <ChakraLink as={NextLink} href="/" color="white" mr={4}>
                      Home
                    </ChakraLink>
                    <ChakraLink as={NextLink} href="/gallery" color="white">
                      Gallery
                    </ChakraLink>
                  </Box>
                  <WalletMultiButton />
                </Box>
                <Component {...pageProps} />
              </SolanaTimeProvider>
            </WalletModalProvider>
          </UmiProvider>
        </WalletProvider>
      </ChakraProvider>
    </>
  );
}
