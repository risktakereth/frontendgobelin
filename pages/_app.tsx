import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";
import { UmiProvider } from "../utils/UmiProvider";
import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ChakraProvider, Text, Box, Link as ChakraLink, Image, Flex, Link, Icon } from '@chakra-ui/react'; // Importez ChakraLink ici
import { image, headerText } from 'settings';
import { SolanaTimeProvider } from "@/utils/SolanaTimeContext";
import NextLink from 'next/link'; // Importez NextLink ici
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"; // Import du bouton de connexion au wallet
import { FaTwitter, FaDiscord } from 'react-icons/fa';

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
                <Box 
                  as="nav" 
                  padding="0.3rem 1rem" 
                  bg="transparent" 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="space-between" 
                  transition="background-color 0.6s ease"
                  borderBottom= "transparent 0.1px solid"
                  _hover={{ bg: "rgba(0, 0, 0, 0.3)", borderBottom: "white 0.1px solid", color: "black" }} 
                >
                  <Box>
  <ChakraLink color="white">
    <Image 
      src="https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmZRjRJJro8ESkr8GA5rwQ6zFR8VzZZcxau8U1LTHTeMH3/collection.png" // Remplacez par l'URL de votre image
      alt="Home" 
      width="4vw" // Ajustez la taille selon vos préférences
      height="auto"
      objectFit="cover"
      marginRight="80px"
    />
  </ChakraLink>
</Box>
                  <Box marginRight="0px" fontSize="120%">
                    <ChakraLink as={NextLink} href="/" color="white" marginRight="40px" padding="4px 6px 6px 6px" borderRadius='4px' transition="background-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease"
                    _hover={{
                      backgroundColor: "rgb(0,0,0,0.5)",
                      filter: "brightness(1.2)", // Effet d'éclaircissement
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
                    }}
                    >
                      Home
                    </ChakraLink>
                    <ChakraLink as={NextLink} href="/mint" color="white" marginRight="40px" padding="4px 6px 6px 6px" borderRadius='4px' transition="background-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease"
                    _hover={{
                      backgroundColor: "rgb(0,0,0,0.5)",
                      filter: "brightness(1.2)", // Effet d'éclaircissement
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
                    }}
                    >
                      Mint
                    </ChakraLink>
                    <ChakraLink as={NextLink} href="/gallery" color="white" padding="4px 6px 6px 6px" borderRadius='4px' transition="background-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease"
                    _hover={{
                      backgroundColor: "rgb(0,0,0,0.5)",
                      filter: "brightness(1.2)", // Effet d'éclaircissement
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
                    }}
                    >
                      Gallery
                    </ChakraLink>
                  </Box>
                  <Box
                    as={WalletMultiButton}
                    bg="transparent"
                    backgroundImage="url('https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmaETkVfYdYo8v1djEstHtA1GNzjsWZhYha5okYRMA8yxv')" // Remplacez par votre URL
                    backgroundSize="cover"
                    backgroundPosition="center"
                    padding="0.5rem 1rem"
                    borderRadius="8px"
                    boxShadow= "0px 4px 15px rgba(0, 0, 0, 0.3)"
                    transition="background-image 0.5s ease, filter 0.5s ease" // Transition douce
                    _hover={{
                      filter: "brightness(1.2)", // Effet d'éclaircissement
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 1)",
                    }}
                  />
                </Box>
                <Component {...pageProps} />
                <Box
                  as="footer"
                  width="100%"
                  py={4}
                  borderTop="1px solid rgba(255, 255, 255, 0.6)"
                  bgGradient="linear(to-t, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5))"
                  color="white"
                >
                  <Flex
                    maxW="1200px"
                    mx="auto"
                    px={4}
                    justify="space-between"
                    align="center"
                  >
                    {/* Logo à gauche */}
                    <Image
                      src="https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmZRjRJJro8ESkr8GA5rwQ6zFR8VzZZcxau8U1LTHTeMH3/collection.png" // Remplace par l'URL de ton logo
                      alt="Logo du projet"
                      boxSize="50px"
                    />

                    {/* Icônes Twitter et Discord à droite */}
                    <Flex gap={4}>
                      <Link href="https://x.com/risktaker_eth" isExternal>
                        <Icon as={FaTwitter} boxSize={6} _hover={{ color: "blue.400" }} />
                      </Link>
                      <Link href="https://discord.gg/8wMyc76t" isExternal>
                        <Icon as={FaDiscord} boxSize={6} _hover={{ color: "purple.500" }} />
                      </Link>
                    </Flex>
                  </Flex>
                </Box>
              </SolanaTimeProvider>
            </WalletModalProvider>
          </UmiProvider>
        </WalletProvider>
      </ChakraProvider>
    </>
  );
}
