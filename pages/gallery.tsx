import {
  PublicKey,
  publicKey,
  Umi,
} from "@metaplex-foundation/umi";
import { DigitalAssetWithToken, JsonMetadata } from "@metaplex-foundation/mpl-token-metadata";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useUmi } from "../utils/useUmi";
import { fetchCandyMachine, safeFetchCandyGuard, CandyGuard, CandyMachine, AccountVersion } from "@metaplex-foundation/mpl-candy-machine"
import styles from "../styles/Home.module.css";
import { guardChecker } from "../utils/checkAllowed";
import { Center, Card, CardHeader, CardBody, StackDivider, Heading, Stack, useToast, Text, Skeleton, useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, Image, ModalHeader, ModalOverlay, Box, Divider, VStack, Flex } from '@chakra-ui/react';
import { ButtonList } from "../components/mintButton";
import { GuardReturn } from "../utils/checkerHelper";
import { ShowNft } from "../components/showNft";
import { InitializeModal } from "../components/initializeModal";
import { image, headerText } from "../settings";
import { useSolanaTime } from "@/utils/SolanaTimeContext";
//for the content page
import Link from 'next/link';
import React from 'react';
import { Tooltip } from "@chakra-ui/react";
import rankingData from '../ranking.json';


const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const useCandyMachine = (
  umi: Umi,
  candyMachineId: string,
  checkEligibility: boolean,
  setCheckEligibility: Dispatch<SetStateAction<boolean>>,
  firstRun: boolean,
  setfirstRun: Dispatch<SetStateAction<boolean>>
) => {
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();
  const [candyGuard, setCandyGuard] = useState<CandyGuard>();
  const toast = useToast();


  useEffect(() => {
    (async () => {
      if (checkEligibility) {
        if (!candyMachineId) {
          console.error("No candy machine in .env!");
          if (!toast.isActive("no-cm")) {
            toast({
              id: "no-cm",
              title: "No candy machine in .env!",
              description: "Add your candy machine address to the .env file!",
              status: "error",
              duration: 999999,
              isClosable: true,
            });
          }
          return;
        }

        let candyMachine;
        try {
          candyMachine = await fetchCandyMachine(umi, publicKey(candyMachineId));
          //verify CM Version
          if (candyMachine.version != AccountVersion.V2){
            toast({
              id: "wrong-account-version",
              title: "Wrong candy machine account version!",
              description: "Please use latest sugar to create your candy machine. Need Account Version 2!",
              status: "error",
              duration: 999999,
              isClosable: true,
            });
            return;
          }
        } catch (e) {
          console.error(e);
          toast({
            id: "no-cm-found",
            title: "The CM from .env is invalid",
            description: "Are you using the correct environment?",
            status: "error",
            duration: 999999,
            isClosable: true,
          });
        }
        setCandyMachine(candyMachine);
        if (!candyMachine) {
          return;
        }
        let candyGuard;
        try {
          candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
        } catch (e) {
          console.error(e);
          toast({
            id: "no-guard-found",
            title: "No Candy Guard found!",
            description: "Do you have one assigned?",
            status: "error",
            duration: 999999,
            isClosable: true,
          });
        }
        if (!candyGuard) {
          return;
        }
        setCandyGuard(candyGuard);
        if (firstRun){
          setfirstRun(false)
        }
      }
    })();
  }, [umi, checkEligibility]);

  return { candyMachine, candyGuard };


};


export default function Home() {
  const umi = useUmi();
  const solanaTime = useSolanaTime();
  const toast = useToast();
  const { isOpen: isShowNftOpen, onOpen: onShowNftOpen, onClose: onShowNftClose } = useDisclosure();
  const { isOpen: isInitializerOpen, onOpen: onInitializerOpen, onClose: onInitializerClose } = useDisclosure();
  const [mintsCreated, setMintsCreated] = useState<{ mint: PublicKey, offChainMetadata: JsonMetadata | undefined }[] | undefined>();
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [ownedTokens, setOwnedTokens] = useState<DigitalAssetWithToken[]>();
  const [guards, setGuards] = useState<GuardReturn[]>([
    { label: "startDefault", allowed: false, maxAmount: 0 },
  ]);
  const [firstRun, setFirstRun] = useState(true);
  const [checkEligibility, setCheckEligibility] = useState<boolean>(true);


  if (!process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
    console.error("No candy machine in .env!")
    if (!toast.isActive('no-cm')) {
      toast({
        id: 'no-cm',
        title: 'No candy machine in .env!',
        description: "Add your candy machine address to the .env file!",
        status: 'error',
        duration: 999999,
        isClosable: true,
      })
    }
  }
  const candyMachineId: PublicKey = useMemo(() => {
    if (process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
      return publicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID);
    } else {
      console.error(`NO CANDY MACHINE IN .env FILE DEFINED!`);
      toast({
        id: 'no-cm',
        title: 'No candy machine in .env!',
        description: "Add your candy machine address to the .env file!",
        status: 'error',
        duration: 999999,
        isClosable: true,
      })
      return publicKey("11111111111111111111111111111111");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { candyMachine, candyGuard } = useCandyMachine(umi, candyMachineId, checkEligibility, setCheckEligibility, firstRun, setFirstRun);




// Définissez un type pour un token, en fonction de ses propriétés
interface Token {
  metadata: {
    uri: string;
  };
}



const fetchNftImages = async (tokens: DigitalAssetWithToken[], targetKey: string) => {
  const images: { mint: PublicKey<string>; offChainMetadata: JsonMetadata | undefined }[] = [];

  for (const token of tokens) {
    console.log("Token data:", token);

    try {
      if (
        token.metadata &&
        token.metadata.collection?.__option === "Some" && // Assure que collection est de type Some
        token.metadata.collection.value.key === targetKey
      ) {
        const metadata = await fetchMetadata(token.metadata.uri);
        if (metadata && metadata.image) {
          // Utiliser `publicKey` de `token.mint` comme `PublicKey<string>`
          const mint = publicKey(token.mint.publicKey) as PublicKey<string>;
          const offChainMetadata = metadata;

          images.push({
            mint,
            offChainMetadata,
          });
        } else {
          console.log(`Pas d'image trouvée pour l'URI: ${token.metadata.uri}`);
        }
      } else {
        console.log(`Le token ne correspond pas à la clé cible: ${targetKey}`);
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'image pour l'URI ${token.metadata.uri}:`, error);
    }
  }

  // Trie les NFTs par le nom dans `offChainMetadata`
  images.sort((a, b) => (a.offChainMetadata?.name || "").localeCompare(b.offChainMetadata?.name || ""));

  return images;
};




  
useEffect(() => {
  const checkEligibilityFunc = async () => {
    if (!candyMachine || !candyGuard || !checkEligibility || isShowNftOpen) {
      return;
    }
    setFirstRun(false);
    
    const { guardReturn, ownedTokens } = await guardChecker(
      umi, candyGuard, candyMachine, solanaTime
    );

    setOwnedTokens(ownedTokens);
    setGuards(guardReturn);
    setIsAllowed(false);

    let allowed = false;
    for (const guard of guardReturn) {
      if (guard.allowed) {
        allowed = true;
        break;
      }
    }

    setIsAllowed(allowed);
    setLoading(false);

    const targetKey = "BbHxPgUrQq7v2f2wayxpTSTEPjgVm7kXBQW1DxVN9Kxw";
    if (ownedTokens) {
      const nftImages = await fetchNftImages(ownedTokens, targetKey);
      console.log('BBBBBBBBBBBBBBBBBBBBbb',nftImages)
      setMintsCreated(nftImages); // Aucun `as` n'est nécessaire ici
    } else {
      setMintsCreated([]);
    }
  };

  checkEligibilityFunc();
}, [umi, checkEligibility, firstRun]);



  const fetchMetadata = async (uri:string) => {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const metadata = await response.json();
      return metadata;
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };












  const PageContent = () => {
    return (
      <>
        <style jsx global>
          {`
          body {
            background: #2d3748;
            padding: 0;
            height: 100vh; /* Pour permettre le scroll */
            background-image: linear-gradient(rgba(0, 0, 0, 0.35),rgba(199, 0, 163, 0.1)), url('https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmYxDryTuLrf3LtGPqmmF6WiDPuv9ANh7RH78o1vJc394t');
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
  
          .center {
            max-width: 99vw;
          }
          
          h4:hover {
            color: white;
          }

          
          `}</style>

          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
  
        <div id="nft-display" style={{ marginTop: '0em', padding: '0em 1em' }}>
          <h2 style={{ textAlign: 'left', fontSize: '200%', marginBottom: '10px', color:'#f9f9f9', fontWeight: '750', textShadow: '0px 0px 10px #ff00bc' }}>Join the Gobelin Rave !</h2>
          {loading ? (
            <p>Chargement des NFTs...</p>
          ) : (
            <div id="nft-ligne" style={{
              display: 'grid',
              gap: '16px',
              justifyContent: 'center',
              maxWidth: '1900px',
              margin: '0 auto' }}>
              {mintsCreated?.length ? (
                mintsCreated.map((nft, index) => {
                  // État pour contrôler l'affichage des attributs
                  const [showAttributes, setShowAttributes] = useState(false);
  
                  // Fonction pour basculer l'affichage des attributs
                  const toggleAttributes = () => {
                    setShowAttributes(prevState => !prevState);
                  };
  
                  return (
                    <div
                      key={index}
                      style={{
                        border: '1.9px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        textAlign: 'center',
                        color:'#d0d0d0',
                        boxShadow: 'rgb(0 0 0 / 55%) 3px 3px 5px',
                        transition: 'box-shadow 0.6s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0px 0px 13px rgba(252, 0, 207, 1)')}
                      onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'rgb(0 0 0 / 55%) 3px 3px 5px')}
                      >

                      <img
                        onClick={toggleAttributes}
                        src={nft.offChainMetadata?.image}
                        alt={nft.offChainMetadata?.name}
                        style={{ width: '512px', cursor: 'pointer', height: 'auto', objectFit: 'contain', borderRadius: '6px 6px 0px 0px', transition: 'filter 0.3s ease', }}
                        onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                      />

                      <div style={{ padding: '0px 10px'}}>  
                      <div style={{
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        marginTop: '7px',
                        display: 'flex', // Pour aligner l'icône et le texte
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>{nft.offChainMetadata?.name}
                      <a
                        href={`https://eclipsescan.xyz/token/${nft.mint}?cluster=devnet`}
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                          display: 'flex',
                          transition: 'color 0.3s ease',
                          }}
                        target="_blank" 
                        rel="noopener noreferrer"
                        onMouseOver={(e) => (e.currentTarget.style.color = '#63B3ED')}
                        onMouseOut={(e) => (e.currentTarget.style.color = 'white')}
                        >
                          <span className="material-icons" style={{ fontSize:'100%' }}>
                            open_in_new
                          </span>
                      </a></div>





                      

                      {/* Affichage du classement */}
                      <div className="ranking">
                        <div>
                         {Object.entries(rankingData).map(([name, rank]) => (
                         name === nft.offChainMetadata?.name && ( // Vérifie si le nom correspond
                            <div style={{textAlign: 'left'}}>
                              Rank: {rank}/1555
                            </div>
                          )
                          ))}
                        </div>
                      </div>







                      <h4
                        onClick={toggleAttributes}
                        style={{
                          fontWeight: 'bold',
                          marginBottom: '5px',
                          fontSize: '16px',
                          cursor: 'pointer',
                          display: 'flex', // Pour aligner l'icône et le texte
                          justifyContent: 'space-between',
                          alignItems: 'center', // Centre l'icône avec le texte
                          //padding: '3px 10px'
                        }}
                      >
                        Attributes :
                        <span className="material-icons" style={{ marginRight: '5px' }}>keyboard_arrow_down</span>
                      </h4>
                      </div>

                          
  
                      {showAttributes && ( // Affiche les attributs uniquement si `showAttributes` est vrai
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                          {nft.offChainMetadata?.attributes?.map((attribute, attrIndex) => (
                            <li key={attrIndex} style={{ fontSize: '14px', marginBottom: '4px' }}>
                              <strong style={{ color: '#63B3ED' }}>{attribute.trait_type}:</strong> <span style={{ color: '#E2E8F0' }}>{attribute.value}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })
              ) : (
                <div style={{marginBottom: '400px'}}>Tu n'as pas encore de NFTs.</div>
              )}
            </div>
          )}
        </div>
      </>
    );
  };
  

  return (
    <main>

      <div className={styles.center}>
        <PageContent key="content" />
      </div>
    </main>
  );
}