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
  import { guardChecker } from "../utils/checkAllowed";
  import { Center, Card, CardHeader, CardBody, StackDivider, Heading, Stack, useToast, Text, Skeleton, useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, Image, ModalHeader, ModalOverlay, Box, Divider, VStack, Flex } from '@chakra-ui/react';
  import { ButtonList } from "../components/mintButton";
  import { GuardReturn } from "../utils/checkerHelper";
  import { ShowNft } from "../components/showNft";
  import { InitializeModal } from "../components/initializeModal";
  import { image, headerText } from "../settings";
  import { useSolanaTime } from "@/utils/SolanaTimeContext";
import styles from "../styles/elixir.module.css"; // Assurez-vous de créer ce fichier CSS.




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
  
  









export default function BlackScreenPage() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false); // État pour gérer la disparition
  const [visible2, setVisible2] = useState(true);
  const [fadeOut2, setFadeOut2] = useState(false);
  const [showImage, setShowImage] = useState(false); // État pour afficher l'image
  const [showGoblin, setShowGoblin] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showBulle2, setShowBulle2] = useState(false);
  const [showBulle1, setShowBulle1] = useState(false);
  const [fadeOutImage, setFadeOutImage] = useState(false); // État pour faire disparaître l'image
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
    //Story
    const [isOverlayVisible, setOverlayVisible] = useState(true);
    const handleButtonClick = () => {
            setFadeOut(true); // Démarre l'animation de disparition
            setTimeout(() => {
              setVisible(false); // Cache l'écran noir après l'animation
              setFadeOut2(true); // Démarre l'animation de disparition pour le deuxième écran noir
      setTimeout(() => {
        setVisible2(false); // Cache le deuxième écran noir
      }, 200); // Durée de disparition pour le deuxième écran noir
            }, 500); // Doit correspondre à la durée de l'animation de disparition
      };
  
  
      // Fonction pour gérer le clic sur "Skip" pour faire disparaître l'image
  const handleSkipClick = () => {
    setFadeOutImage(true); // Démarre la disparition de l'image
    setTimeout(() => {
      setShowImage(false); // Cache complètement l'image après le fondu
    }, 500); // Durée de l'animation de fondu pour l'image
    setVisible(false); // Cache l'écran principal si souhaité
  };

  const handleClick = () => {
    setShowGoblin(true); // Affiche l'image du gobelin lors du clic
    setTimeout(() => {
      setShowBulle1(true);
    }, 0);
    setTimeout(() => {
      setShowBulle2(true);
    }, 2000);
    setTimeout(() => {
      setShowBulle1(false);
    }, 1850);
    setTimeout(() => {
      setShowNext(true);
    }, 4000);
  };

  
  
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
      };

  
      checkEligibilityFunc();
      // On purpose: not check for candyMachine, candyGuard, solanaTime
      // eslint-disable-next-line react-hooks/exhaustive-deps
      
      // Timer pour faire disparaître l'écran rouge en premier
    const timerRedScreen = setTimeout(() => {
      setFadeOut2(true); // Démarre l'animation de fondu de l'écran rouge
      setTimeout(() => {
        setVisible2(false); // Cache complètement l'écran rouge après le fondu
      }, 2000); // Durée de l'animation de fondu pour l'écran rouge
    }, 300); // Délai initial avant que l'écran rouge commence à disparaître


    // Timer pour afficher l'image à t=2.5s
    const timerShowImage = setTimeout(() => {
      setShowImage(true); // Affiche l'image
    }, 100); // Délai pour l'apparition de l'image

    // Timer pour faire disparaître l'écran noir indépendamment
    const timerBlackScreen = setTimeout(() => {
      setFadeOut(true); // Démarre l'animation de fondu de l'écran noir
      setTimeout(() => {
        setVisible(false); // Cache complètement l'écran noir après le fondu
      }, 1000); // Durée de l'animation de fondu pour l'écran noir
    }, 100000); // Délai avant la disparition de l'écran noir (après l'écran rouge)


    // Timer pour faire disparaître l'image automatiquement à t=5s
    const timerHideImage = setTimeout(() => {
      setFadeOutImage(true); // Démarre la disparition de l'image
      setTimeout(() => {
        setShowImage(false); // Cache complètement l'image
      }, 500); // Durée de l'animation de fondu pour l'image
    }, 100000); // Disparition automatique à 5 secondes

    // Nettoyage des timers
    return () => {
      clearTimeout(timerRedScreen);
      clearTimeout(timerBlackScreen);
      clearTimeout(timerShowImage);
      clearTimeout(timerHideImage);
    };

      

    return () => clearTimeout(timer); // Nettoyage du timer
  }, [umi, checkEligibility, firstRun]);

  return (<>
    <style jsx global>
            {`
        body {
            background: #2d3748;
            padding: 0;
            height: 100vh; /* Pour permettre le scroll */
            background-image: linear-gradient(rgba(99, 64, 0, 0.2), rgba(255, 255, 0, 0.2)), url('https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmQTQaNzfAYfRcG5X1wpRLa7mi1GDF138zdp8jPXe8BWnK');
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
         }

         .button {
            position: fixed;
            font-size: 1rem;
            padding: 1rem 2rem;
            color: rgb(150,150,150);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s;
            bottom: 0;
            left: 0;
            margin: 5px;
          }

          .button:hover {
            transform: scale(1.05);
            color: white;
          }

        #centercolonne {
            max-width: 700px;
            margin: 0px auto 120px auto;
         }


        @keyframes blinkAnimation {
          0%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(199, 0, 163, 0.8)) brightness(1.2);
          }
          50% {
            opacity: 0.5;
            filter: drop-shadow(0 0 10px rgba(199, 0, 163, 0.3)) brightness(1);
          }
        }

        .blinkEffect {
          animation: blinkAnimation 2s infinite;
        }

        
        .blinkEffect:hover {
          animation: none; /* Désactive le clignotement au survol */
        }
        

         .highlightEffect {
          transition: filter 0.3s ease, box-shadow 0.3s ease;
        }

        .highlightEffect:hover {
          filter: brightness(1.2); /* Légère augmentation de la luminosité */
          filter: drop-shadow(0 0 15px rgba(199, 0, 163, 0.6)) brightness(1.1); /* Effet de lueur */
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.9)) brightness(1.3); /* Effet de lueur */
        }

        .goblinImage {
          opacity: 0;
          animation: fadeInGoblin 0.5s forwards;
        }

        .fadeInGoblin {
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}




     `}
          </style>



      

      

    <div className={styles.container}>

        {visible2 && (
          <div className={`${styles.redScreen} ${fadeOut2 ? styles.fadeOut2 : ''}`}>
          </div>
        )}


              
{visible && (
          <div className={`${styles.blackScreen} ${fadeOut ? styles.fadeOut : ''}`}>
            <div className={`${styles.textContainer} ${fadeOut ? styles.fadeOut : ''}`}>
              <button className="button" onClick={handleSkipClick} style={{fontSize:"150%"}}>Skip</button>
            </div>
            

            {/* Affiche l'image sur le fond noir à t=2.5s */}
            {showImage && (
              
              <img
                src="https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmZ9GMp4W1XUKNyCCeieZ69h1FcnxfMPdpryVfvVaVL5Vb"
                alt="Surprise Image"
                className={`${fadeOutImage ? 'hiddenImage' : 'fadeIn'}`}
                style={{ position: "fixed", top: "-5vw", left: "0px", width: "100%"}}
              />
            )}
            {/* Affiche l'image sur le fond noir à t=2.5s */}
            {showImage && (
              
              <img
                src="/panneau3.png"
                alt="Surprise Image"
                className={`${fadeOutImage ? 'hiddenImage' : 'fadeIn'} highlightEffect ${!showGoblin ? 'blinkEffect' : ''}`}
                onClick={handleClick}
                style={{ position: "fixed", top: "15vw", left: "35vw", width: "13.3%", cursor: "pointer"}}
              />
            )}

  {/*images qui apparaissent après le clic*/}
            {showGoblin && (
              <div
                  className={styles.goblinImage}
                  style={{position: "fixed", /* Utilisez fixed pour couvrir tout l'écran */
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgb(0, 0, 0)",
                    filter: "opacity(50%)",}}
              >
              </div>
            )}
            {showGoblin && (
              <img
                src="https://png.pngtree.com/png-clipart/20211116/original/pngtree-frightened-goblin-cartoon-png-image_6929568.png" // Remplacez par le chemin de votre image de gobelin
                alt="Goblin Image"
                className={styles.goblinImage}
                className="fadeInGoblin"
                style={{ position: "fixed", top: "20vw", left: "50vw", width: "40%" }}
              />
            )}
            {showBulle1 && (
              <img
                src="https://static.vecteezy.com/system/resources/previews/022/129/782/non_2x/speech-bubble-thought-bubble-comic-bubble-transparent-free-free-png.png" // Remplacez par le chemin de votre image de gobelin
                alt="Goblin Image"
                className={styles.goblinImage}
                className="fadeInGoblin"
                style={{ position: "fixed", top: "10vw", left: "30vw", width: "25%" }}
              />
            )}

            {/* Afficher le bouton Next*/}
            {showBulle2 && (
              <img
                src="https://static.vecteezy.com/system/resources/previews/022/129/782/non_2x/speech-bubble-thought-bubble-comic-bubble-transparent-free-free-png.png" // Remplacez par le chemin de votre image de gobelin
                alt="Goblin Image"
                className={styles.goblinImage}
                className="fadeInGoblin"
                style={{ position: "fixed", top: "19vw", left: "35vw", width: "25%" }}
              />
            )}
            {showNext && (
              <img
                src="https://png.pngtree.com/png-clipart/20211116/original/pngtree-frightened-goblin-cartoon-png-image_6929568.png" // Remplacez par le chemin de votre image de gobelin
                alt="Goblin Image"
                className={styles.goblinImage}
                className="fadeInGoblin"
                style={{ position: "fixed", top: "20vw", left: "60vw", width: "40%" }}
              />
            )}
            

            
          </div>
        )}
        






      
      <div id="centercolonne">

  
          {loading ? (<></>) : (
                  <Flex justifyContent="flex-end" marginLeft="auto">
                    <Box background={"teal.100"} borderRadius={"5px"} minWidth={"50px"} minHeight={"50px"} p={2} >
                      <VStack >
                        <Text fontSize={"sm"}>Available NFTs:</Text>
                        <Text fontWeight={"semibold"}>{Number(candyMachine?.data.itemsAvailable) - Number(candyMachine?.itemsRedeemed)}/{Number(candyMachine?.data.itemsAvailable)}</Text>
                      </VStack>
                    </Box>
                  </Flex>
                )}
  
  
  
  
  
  
          <Card margin='25px 0px 0px 10px'
          backgroundSize='cover'
          backgroundRepeat='no-repeat'
          boxShadow='0px 0px 3px black'
          border='1px solid black'
          color='white'
          //filter= 'brightness(1.1)'
          backgroundImage='url(https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmPWNP1nsrxTH342juNwLqLGqvTxZFjWNG5zJ8ggobDAXU)'
          >
            <CardHeader>
              <Flex minWidth='max-content' alignItems='center' gap='2' flexDirection='column' fontSize='150%'>
                <Box marginTop='5px'>
                  {/*<Heading size='md'>{headerText}</Heading>*/}
                  <h2 style={{
                    marginBottom: '0em',
                    color: 'white',
                    textShadow: `
                      0 0 5px pink,
                      0 0 10px pink,
                      0 0 20px magenta,
                      0 0 30px magenta
                    `,
                    filter: 'brightness(1.05)',
                    fontSize: '140%',
                    fontWeight: 'bold',
                    textTransform: 'uppercase', // Mettre le texte en majuscules
                    border: '5px solid white', // Bordure blanche
                    padding: '10px',
                    borderRadius: '8px',
                    display: 'inline-block',
                    backgroundColor: 'transparent', // Fond clair pour faire ressortir l'ombre
                    position: 'relative',
                    //transform: 'skew(-5deg)',
                    transform: 'rotate(-1deg)',
                    boxShadow: `
                    0 0 5px pink,
                    0 0 8px pink,
                    0 0 10px magenta,
                    0 0 12px magenta
                    `
                  }}>
                    Welcome to the Gobelin Rave!
                    <span style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  backgroundColor: 'transparent',
                  boxShadow: `
                    inset 0 0 5px pink,
                    inset 0 0 8px pink,
                    inset 0 0 10px magenta,
                    inset 0 0 12px magenta
                  `,
                  zIndex: +1 // Met l'ombre derrière le texte
                  }} />
                  </h2>
                </Box>              
              </Flex>
  
              
            </CardHeader>
  
            <CardBody>
              <Center>
                <Box
                  rounded={'lg'}
                  mt={-12}
                  pos={'relative'}
                  marginTop={'-10px'}>
                  <Image
                    rounded={'lg'}
                    height={230}
                    objectFit={'cover'}
                    alt={"project Image"}
                    src={image}
                    cursor={'pointer'}
                    boxShadow={'black 0px 0px 5px, brown 0px 0px 10px, brown 0px 0px 20px'}
                    onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
                    onMouseOut={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                  />
                </Box>
              </Center>
              <Stack divider={<StackDivider />} spacing='8'>
                {loading ? (
                  <div>
                    <Divider my="10px" />
                    <Skeleton height="30px" my="10px" />
                    <Skeleton height="30px" my="10px" />
                    <Skeleton height="30px" my="10px" />
                  </div>
                ) : (
                  <ButtonList
                    guardList={guards}
                    candyMachine={candyMachine}
                    candyGuard={candyGuard}
                    umi={umi}
                    ownedTokens={ownedTokens}
                    setGuardList={setGuards}
                    mintsCreated={mintsCreated}
                    setMintsCreated={setMintsCreated}
                    onOpen={onShowNftOpen}
                    setCheckEligibility={setCheckEligibility}
                  />
                )}
              </Stack>
            </CardBody>
          </Card >
          {umi.identity.publicKey === candyMachine?.authority ? (
            <>
              <Center>
                <Button backgroundColor={"red.200"} marginTop={"10"} onClick={onInitializerOpen}>Initialize Everything!</Button>
              </Center>
              <Modal isOpen={isInitializerOpen} onClose={onInitializerClose}>
                <ModalOverlay />
                <ModalContent maxW="600px">
                  <ModalHeader>Initializer</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    < InitializeModal umi={umi} candyMachine={candyMachine} candyGuard={candyGuard} />
                  </ModalBody>
                </ModalContent>
              </Modal>
  
              
  
            </>)
            :
            (<></>)
          }
  
          <Modal isOpen={isShowNftOpen} onClose={onShowNftClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Your minted NFT:</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <ShowNft nfts={mintsCreated} />
              </ModalBody>
            </ModalContent>
          </Modal>
          </div>

















    </div>
    </>
  );
}
