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
        <meta property="og:description" content="Join the Rave! GoblinzRave is a NFT collection only avalaible on Eclipse Mainnet" />
        <meta name="description" content="Join the Rave! GoblinzRave is a NFT collection only avalaible on Eclipse Mainnet" />
        <meta property="og:image" content={image} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{headerText}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>
          {`
            @font-face {
              font-family: 'Clash';
              src: url('/You Blockhead.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }

            @font-face {
              font-family: 'Loved';
              src: url('/LovedbytheKing-Regular.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
            
            @font-face {
              font-family: 'Freeman';
              src: url('/Freeman-Regular.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
          `}
        </style>
      <ChakraProvider>
        <WalletProvider wallets={wallets}>
          <UmiProvider endpoint={endpoint}>
            <WalletModalProvider>
              <SolanaTimeProvider>
                {/* Barre de navigation avec menu et bouton wallet */}
                <Box 
  as="nav" 
  padding="1rem 1rem 0rem 1rem" 
  bg="transparent" 
  display="flex" 
  alignItems="center" 
  justifyContent="space-between"
>
  {/* Logo à gauche */}
  <Box>
    <Image 
      src="/Goblinz_logo.png" 
      alt="Logo" 
      height="40px" // Ajustez la taille selon vos besoins
      width="auto" 
    />
  </Box>

  {/* Menu centré */}
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    margin="0 auto" // Centrage horizontal
    fontSize="120%"
  >
    <ChakraLink
      as={NextLink}
      style={{
        fontFamily: 'Clash', fontSize: '16px',
      }}
      href="/"
      color="white"
      marginRight="40px"
      padding="6px 12px 6px 12px"
      borderRadius='4px'
      transition="background-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        color: "black",
      }}
    >
      Home
    </ChakraLink>
    <ChakraLink
      as={NextLink}
      style={{
        fontFamily: 'Clash', fontSize: '16px',
      }}
      href="/mint"
      color="white"
      marginRight="40px"
      padding="6px 12px 6px 12px"
      borderRadius='4px'
      transition="background-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        color: "black",
      }}
    >
      Mint Free Elixir
    </ChakraLink>
    <ChakraLink
      as={NextLink}
      style={{
        fontFamily: 'Clash', fontSize: '16px',
      }}
      href="/gallery"
      color="white"
      marginRight="40px"
      padding="6px 12px 6px 12px"
      borderRadius='4px'
      transition="background-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        color: "black",
      }}
    >
      My Elixir
    </ChakraLink>
  </Box>

  

  {/* Bouton Wallet à droite */}
  <Box
    as={WalletMultiButton}
    bg="transparent"
    padding="0.5rem 1rem"
    borderRadius="8px"
  />

  {/* Icône Discord */}
  <a href="https://discord.com/invite/8wMyc76t" rel="noopener noreferrer">
              <div
                  style={{
                    zIndex: 100,
                    position: 'absolute',
                    width: '34px',
                    height: '34px',
                    backgroundColor: '#42a6ff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                    transform: 'rotate(8deg) translate(48px, -28px)', // Inclinaison de l'icône
                    transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(8deg) translate(52px, -24px)'} // Décalage vers la droite et le bas
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(8deg) translate(48px, -28px)'} // Rétablir la position originale
                >
                  <i className="fab fa-discord" style={{ color: 'white', fontSize: '20px' }}></i>
                </div>
                <div
                  style={{
                    zIndex: 5,
                    marginRight: '20px',
                    position: 'absolute',
                    width: '34px',
                    height: '34px',
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                    transform: 'rotate(8deg) translate(52px, -24px)',
                  }}>
                </div>
              </a>


































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
                      src="/Goblinz_logo.png" // Remplace par l'URL de ton logo
                      alt="Logo du projet"
                      maxWidth="10%"
                    />

                    {/* Icônes Twitter et Discord à droite */}
                    <Flex gap={4}>
                      <Link href="https://x.com/GoblinzRave" isExternal>
                        <Icon as={FaTwitter} boxSize={6} _hover={{ color: "blue.400" }} verticalAlign="middle" transition="0.2s"/>
                      </Link>
                      <Link href="https://discord.gg/8wMyc76t" isExternal>
                        <Icon as={FaDiscord} boxSize={6} _hover={{ color: "purple.500" }} verticalAlign="middle" transition="0.2s"/>
                      </Link>
                      <Link href="https://guild.xyz/GoblinzRave" isExternal>
                        <Image
                          src="/guild.png"
                          alt="Guild Icon"
                          boxSize={6}
                          transition="0.2s"
                          _hover={{
                            filter:
                              "brightness(0) saturate(100%) invert(64%) sepia(82%) saturate(1500%) hue-rotate(87deg) brightness(85%) contrast(90%)"
                          }}
                        />
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
