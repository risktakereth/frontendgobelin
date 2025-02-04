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
  import { ChakraProvider, Center, Card, CardHeader, CardBody, StackDivider, Heading, Stack, useToast, Text, Skeleton, useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, Image, ModalHeader, ModalOverlay, Box, Divider, VStack, Flex } from '@chakra-ui/react';
  import { ButtonList } from "../components/mintButton";
  import { GuardReturn } from "../utils/checkerHelper";
  import { ShowNft } from "../components/showNft";
  import { InitializeModal } from "../components/initializeModal";
  import { image, headerText } from "../settings";
  import { useSolanaTime } from "@/utils/SolanaTimeContext";
  
import { ButtonSection } from "../components/mintsection";
import { ElixirSection } from "../components/mintElixir";
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
  const [showBulle1, setShowBulle1] = useState(false);
  const [showMessage1, setShowMessage1] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false);
  const [showMessage3, setShowMessage3] = useState(false);
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

  // Changer le texte de la bulle au clic
  const handleMessage1Click = () => {
    setShowMessage1(false); // Démarre la disparition de l'image
    setShowMessage2(true); // Cache l'écran principal si souhaité
  };

  // Changer le texte de la bulle au clic
  const handleMessage2Click = () => {
    setShowMessage2(false); // Démarre la disparition de l'image
    setShowMessage3(true); // Cache l'écran principal si souhaité
  };

  
  const [popupOpen, setPopupOpen] = useState(false);

  const handleClick = () => {
    setShowGoblin(true); // Affiche l'image du gobelin lors du clic
    setTimeout(() => {
      setShowBulle1(true);
    }, 0);
    setTimeout(() => {
      setShowMessage1(true);
    }, 0);
    setTimeout(() => {
      setShowMessage1(false);
    }, 9000);
    setTimeout(() => {
      setShowMessage2(true);
    }, 9000);
    setTimeout(() => {
      setShowMessage2(false);
    }, 18000);
    setTimeout(() => {
      setShowMessage3(true);
    }, 18000);
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
      }, 1500); // Durée de l'animation de fondu pour l'écran rouge
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

      

    //return () => clearTimeout(timer); // Nettoyage du timer
  }, [umi, checkEligibility, firstRun]);

  return (<>
    <style jsx global>
            {`
        body {
          background: radial-gradient(circle at 50% 50%, grey, black) !important;
          padding: 0;
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


@keyframes float {
  0% {
    transform: translateY(0); /* Position initiale */
  }
  50% {
    transform: translateY(-7px); /* Monte légèrement */
  }
  100% {
    transform: translateY(0); /* Redescend */
  }
}

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
      
      .chakra-numberinput {
            display: none;
      }

      .chakra-stack {
            justify-content: center;
      }

      .css-1b379r3{
            display: none;
      }
          
      #centercolonne {
          max-width: 1300px;
          display: flex;
          align-itmes: center;
          margin: 0 auto;
          text-align: center;
          justify-content: center;
          flex-direction: column;
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
        src="/forest4.png"
        alt="Surprise Image"
        className={`${fadeOutImage ? 'hiddenImage' : 'fadeIn'}`}
        style={{ position: "fixed", top: "-5vw", left: "0px", width: "100%"}}
      />
    )}
    {/* Affiche l'image sur le fond noir à t=2.5s */}
    {showImage && (
      
      <img
        src="/panneau_new.png"
        alt="Surprise Image"
        className={`${fadeOutImage ? 'hiddenImage' : 'fadeIn'} highlightEffect ${!showGoblin ? 'blinkEffect' : ''}`}
        onClick={handleClick}
        style={{ position: "fixed", top: "12.98vw", left: "35.11vw", width: "15.1%", cursor: "pointer"}}
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
      src="merchant.png" // Remplacez par le chemin de votre image
      alt="Goblin Image"
      className="floatingGoblin"
      style={{
        position: "fixed",
        bottom: "-2vw",
        left: "0%",
        width: "80%",
        animation: "float 12s ease-in-out infinite", /* Flotte doucement */
        animationDelay: "0s", /* Délai avant de commencer l'animation */
      }}
    />
    )}
    {showBulle1 && (
<div>

<div
style={{
position: "fixed",
top: "8vw",
left: "50%",
width: "33%",
display: "flex",
justifyContent: "center",
alignItems: "center",
animation: "fadeInGoblin 1s ease-in-out",
}}
>
<img
src="bulle.png"
alt="Bulle1"
style={{ width: "100%" }}
/>
</div>
</div>
)}



{showMessage1 && (
        <div>
        <ChakraProvider>
        <Text
        fontFamily="Freeman"
        onClick={handleMessage1Click}
        style={{
          position: 'fixed',
          top: '12vw',
          left: '58.5%',
          maxWidth: '22%',
          wordBreak: 'normal',
          lineHeight: 'clamp(1, 1.2, 1.5)',                  
          cursor: 'pointer',
      }} fontSize="2xl"  _hover={{
        fontWeight: '600',
        color: '#022106'
      }}>
          {Array.from("So, you've been invited to GoblinZ   Rave ?")
            .map((char, index) => (
              <span
                key={index}
                style={{
                  animation: `typing 0.1s steps(1) ${index * 0.02}s forwards`,
                  animationFillMode: 'forwards', // Assure que l'état final persiste
                  whiteSpace: 'nowrap',
                  zIndex: '9999',
                  position: 'relative',
                  display: 'inline-block',
                  opacity: '0',
                  wordBreak: 'normal',
                  fontSize: '1.5vw',
                }}
              >
                {char === ' ' ? '\u00A0' : char} {/* Garde les espaces */}
              </span>
            ))}

              
        </Text>
        <style>
          {`
            @keyframes typing {
              from {
                opacity: 1;
              }
              to {
                opacity: 1;
              }
            }
          `}
        </style>
      </ChakraProvider>

      <ChakraProvider>
      <Text
        fontFamily="Freeman"
        onClick={handleMessage1Click}
        style={{
          position: 'fixed',
          top: '69.5dvh',
          left: '72.2%',
          maxWidth: '22%',
          wordBreak: 'normal',
          lineHeight: 'clamp(1, 1.2, 1.5)',                  
          cursor: 'pointer',
      }} fontSize="2xl"  _hover={{
        fontWeight: '800',
        color: '#022106'
      }}>
              <span
                style={{
                  fontFamily: 'Clash',
                  whiteSpace: 'nowrap',
                  zIndex: '9999',
                  position: 'relative',
                  display: 'inline-block',
                  wordBreak: 'normal',
                  fontSize: '1.35vw',
                }}
              >
                Continue
              </span>
            

              
        </Text>
      </ChakraProvider>
      </div>
    )}

{showMessage2 && (
        <div>
        <ChakraProvider>
        <Text
        fontFamily="Freeman"
        onClick={handleMessage2Click}
        style={{
          position: 'fixed',
          top: '12vw',
          left: '58.5%',
          maxWidth: '22.5%',
          wordBreak: 'normal',
          lineHeight: 'clamp(1, 1.2, 1.5)',
          cursor: 'pointer',
      }} fontSize="2xl"  _hover={{
        fontWeight: '600',
        color: '#022106'
      }}>
          {Array.from("Goblin fests are wild and intense,     only my special elixir will get you       through the night!")
            .map((char, index) => (
              <span
                key={index}
                style={{
                  animation: `typing 0.1s steps(1) ${index * 0.02}s forwards`,
                  animationFillMode: 'forwards', // Assure que l'état final persiste
                  whiteSpace: 'nowrap',
                  zIndex: '9999',
                  position: 'relative',
                  display: 'inline-block',
                  opacity: '0',
                  wordBreak: 'normal',
                  fontSize: '1.5vw',
                }}
              >
                {char === ' ' ? '\u00A0' : char} {/* Garde les espaces */}
              </span>
            ))}
        </Text>
        <style>
          {`
            @keyframes typing {
              from {
                opacity: 1;
              }
              to {
                opacity: 1;
              }
            }
          `}
        </style>
      </ChakraProvider>
      <ChakraProvider>
      <Text
        fontFamily="Freeman"
        onClick={handleMessage2Click}
        style={{
          position: 'fixed',
          top: '69.5dvh',
          left: '72.2%',
          maxWidth: '22%',
          wordBreak: 'normal',
          lineHeight: 'clamp(1, 1.2, 1.5)',                  
          cursor: 'pointer',
      }} fontSize="2xl"  _hover={{
        fontWeight: '800',
        color: '#022106'
      }}>
              <span
                style={{
                  fontFamily: 'Clash',
                  whiteSpace: 'nowrap',
                  zIndex: '9999',
                  position: 'relative',
                  display: 'inline-block',
                  wordBreak: 'normal',
                  fontSize: '1.35vw',
                }}
              >
                Continue
              </span>
            

              
        </Text>
      </ChakraProvider>
      </div>
    )}

{showMessage3 && (
        <div>
        <ChakraProvider>
        <Text
        fontFamily="Freeman"
        onClick={handleSkipClick}
        style={{
          position: 'fixed',
          top: '12vw',
          left: '58.5%',
          maxWidth: '22%',
          wordBreak: 'normal',
          lineHeight: 'clamp(1, 1.2, 1.5)',
          cursor: 'pointer',
      }} fontSize="2xl" _hover={{
        fontWeight: '600',
        color: '#022106'
      }}>
          {Array.from("Step closer and see for yourself...")
            .map((char, index) => (
              <span
                key={index}
                style={{
                  animation: `typing 0.1s steps(1) ${index * 0.02}s forwards`,
                  animationFillMode: 'forwards', // Assure que l'état final persiste
                  whiteSpace: 'nowrap',
                  zIndex: '9999',
                  position: 'relative',
                  display: 'inline-block',
                  opacity: '0',
                  wordBreak: 'normal',
                  fontSize: '1.5vw',
                }}
              >
                {char === ' ' ? '\u00A0' : char} {/* Garde les espaces */}
              </span>
            ))}
        </Text>
        <style>
          {`
            @keyframes typing {
              from {
                opacity: 1;
              }
              to {
                opacity: 1;
              }
            }
          `}
        </style>
      </ChakraProvider>
      <ChakraProvider>
      <Text
        fontFamily="Freeman"
        onClick={handleSkipClick}
        style={{
          position: 'fixed',
          top: '69.5dvh',
          left: '72.2%',
          maxWidth: '22%',
          wordBreak: 'normal',
          lineHeight: 'clamp(1, 1.2, 1.5)',                  
          cursor: 'pointer',
      }} fontSize="2xl"  _hover={{
        fontWeight: '800',
        color: '#022106'
      }}>
              <span
                style={{
                  fontFamily: 'Clash',
                  whiteSpace: 'nowrap',
                  zIndex: '9999',
                  position: 'relative',
                  display: 'inline-block',
                  wordBreak: 'normal',
                  fontSize: '1.35vw',
                }}
              >
                Continue
              </span>
            

              
        </Text>
      </ChakraProvider>
      </div>
    )}

    {showNext && (
      <button className="button" onClick={handleSkipClick} style={{fontSize:"150%", left:'85%'}}>SKIP</button>
    )}
    

    
  </div>
)}








<div id="centercolonne">     




        <div>
  <div
    style={{
      backgroundColor: 'transparent',
      height: '100vh',
      boxSizing: 'border-box', // Inclut padding/margin dans la hauteur
      paddingBottom: '30px',
    }}
  >
    <h2
      style={{
        fontFamily: 'Clash',
        textShadow: '4px 4px 0px black',
        fontSize: '35px',
        color: 'white',
        textAlign: 'center',
        padding: '20px 0px',
        margin: '35px 0px 0px 0px',
      }}
    >
      BRING YOUR ELIXIR TO THE RAVE!
    </h2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 'calc(100% - 60px)', // Ajuste pour tenir compte de la hauteur du h2
      }}
    >
      {/* Left Section with MINT button */}
      <div
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          margin: '0 10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%', // S'assure que la hauteur reste contrôlée
          overflow: 'hidden', // Empêche tout débordement interne
        }}
      >
        <div style={{ width: '90%', margin: '0px 0px 20px 0px', 
          border: '2px solid grey',
          borderRadius: '20px',
          backgroundColor: 'rgb(0,0,0,0.1)',
          padding: '40px 60px',}}>
<h2
              style={{
                fontFamily: 'Clash',
                textShadow: '4px 4px 0px black',
                fontSize: '21px',
                color: 'white',
                textAlign: 'center',
               }}>
                FREE ELIXIR
              </h2>
              <span style={{fontFamily: 'Freeman', color: 'white',}}>Price: Free</span>

              <Stack divider={<StackDivider />} spacing='8'>
              {loading ? (
                <div>
                  <Divider my="10px" />
                  <Skeleton height="30px" my="10px" />
                  <Skeleton height="30px" my="10px" />
                  <Skeleton height="30px" my="10px" />
                </div>
              ) : (
                <ElixirSection
                guardList={guards}
                candyMachine={candyMachine}
                candyGuard={candyGuard!}
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



            {/* BARRE DE PROGRESSION*/}
            <div style={{ display: 'flex', marginTop: '12px', paddingBottom: '5px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <div
  style={{
    color: '#d2d2d2',
    fontWeight: '300',
    fontFamily: 'Freeman',
    letterSpacing: '0.8px',
  }}
>
  <span style={{ color: '#000fff', fontSize: '130%'}}>Total Minted: </span>
  <span style={{ color: 'white', fontSize: '130%' }}>{Number(candyMachine?.itemsRedeemed)}</span>
  <span style={{ color: '#000fff', fontSize: '130%' }}>
    /{Number(candyMachine?.data.itemsAvailable)}
  </span>
</div>            </div>
            <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
              <div
                style={{
                    width: `${candyMachine && candyMachine.itemsRedeemed && candyMachine.data?.itemsAvailable?(Number(candyMachine.itemsRedeemed) / Number(candyMachine.data.itemsAvailable)) * 100: 0}%`,                      
                    height: '15px',
                    backgroundColor: 'blue',
                    transition: 'width 0.5s ease-in-out',
                    borderRadius: '0px 10px 10px 0px',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              
                {/* POPUP */}
    <div>
      <button onClick={() => setPopupOpen(true)}
        style={{
          padding: "8px",
          color: "white",
          borderRadius: "4px",
          border: "none",
          textAlign: 'left',
          fontWeight: '300',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: '5s'
        }}
        onMouseEnter={(e) => {
          const target = e.target as HTMLElement;  // Cast de e.target en HTMLElement
          target.style.textDecoration = 'underline';  // Applique l'underline
        }}
        onMouseLeave={(e) => {
          const target = e.target as HTMLElement;  // Cast de e.target en HTMLElement
          target.style.textDecoration = 'none';  // Retire l'underline
        }}
      >
        Why should I mint free Elixir?
      </button>
      {popupOpen && (
        <div 
          style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            display: popupOpen ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center", 
            backgroundColor: "rgba(0, 0, 0, 0.75)", 
            zIndex: 50,
            color: "white",
            opacity: popupOpen ? 1 : 0,
            visibility: popupOpen ? "visible" : "hidden",
            transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out"
          }}
        >
          <div 
            style={{ 
              backgroundColor: "rgba(63, 63, 63, 1)", 
              padding: "0px", 
              borderRadius: "8px", 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
              transform: popupOpen ? "scale(1)" : "scale(0.8)",
              transition: "transform 5s ease-in-out"
            }}
          >
          <button 
          onClick={() => setPopupOpen(false)} 
          style={{
            //backgroundColor: "white", 
            color: "white", 
            borderRadius: "8px", 
            //boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", 
            border: "none",
            position: "relative", 
            top: "-0", 
            right: "-0%",
            padding: "5px",
            zIndex: '100',
            marginLeft: "auto", // Aligne à droite
            display: "block" // Assure que l'auto-margin fonctionne
          }}
        >
          ❌
        </button>
        <div style={{fontFamily: 'Freeman', fontSize: '16px', padding: '0px 24px 24px 24px'}}>
            <p style={{ fontFamily: 'Clash', fontSize: "18px", fontWeight: "600", position: "relative", top: "-10%" }}>Why should I mint Free Elixir?</p>
            </div>
          </div>
        </div>
      )}
    </div>
            </div>

            





              </div>
      </div>

      {/* Image Section */}
      <div
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          margin: '0 10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%', // Assure la hauteur reste contrôlée
        }}
      >
        <div
        style={{
          border: '2px solid grey',
          borderRadius: '20px',
          backgroundColor: 'rgb(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'center',
          //alignItems: 'center',
          flex: 1, // Permet au conteneur de s'ajuster dynamiquement dans un contexte flex
          aspectRatio: 1, // Assure que la largeur et la hauteur restent égales
          maxWidth: '75%', // Limite à 60% de la largeur du parent
        }}>
        <div
        style={{
          width: '85%', // Largeur du conteneur
          aspectRatio: '1', // Garder le ratio original de l'image
          borderRadius: '20px', // Applique le rayon de bord sur le conteneur
          overflow: 'hidden', // Cache tout dépassement de l'image en dehors du conteneur
          display: 'flex', // Aligne l'image de manière appropriée
          justifyContent: 'center', // Centrer horizontalement
          alignItems: 'center', // Centrer verticalement
        }}
      >
        <img
          src="gobelin.png"
          alt="Gobelin"
          style={{
            width: '100%', // L'image occupe 100% de la largeur du conteneur
            height: 'auto', // Assure que l'image conserve son ratio d'origine
            borderRadius: '20px',
          }}
        />
      </div>

        </div>
      </div>
    </div>
    <hr/>
  </div>
</div>








        <Card margin='25px 0px 0px 10px'
        bg='transparent'
        boxShadow='none'
        display='none'
        >

          <CardBody>
            <Center>
              <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                marginTop={'-10px'}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'top'}}>
                <Image
                  rounded={'lg'}
                  height={'22vw'}
                  objectFit={'cover'}
                  alt={"project Image"}
                  src={image}
                  cursor={'pointer'}
                  boxShadow={'black 0px 0px 5px, brown 0px 0px 10px, brown 0px 0px 20px'}
                  onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                />
                {loading ? (<></>) : (

<div style={{ marginLeft: '50px', width: '40vw'}}>
<h2
              style={{
                fontFamily: 'Clash',
                textShadow: '4px 4px 0px black',
                fontSize: '21px',
                color: 'white',
                textAlign: 'center',
               }}>
                MINT YOUR ELIXIR
              </h2>
      <div style={{ display: 'flex', paddingBottom: '5px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
        <div style={{ color: 'white', fontWeight: '600'}}>{100*Number(candyMachine?.itemsRedeemed)/Number(candyMachine?.data.itemsAvailable)}% minted</div>
        <div style={{ color: '#d2d2d2', fontWeight: '300'}}>{Number(candyMachine?.itemsRedeemed)}/{Number(candyMachine?.data.itemsAvailable)}</div>
      </div>




                <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${candyMachine && candyMachine.itemsRedeemed && candyMachine.data?.itemsAvailable?(Number(candyMachine.itemsRedeemed) / Number(candyMachine.data.itemsAvailable)) * 100: 0}%`,                      
                      height: '20px',
                      backgroundColor: 'blue',
                      transition: 'width 0.5s ease-in-out',
                    }}
                  />
              </div>
              <Stack divider={<StackDivider />} spacing='8'>
              {loading ? (
                <div>
                  <Divider my="10px" />
                  <Skeleton height="30px" my="10px" />
                  <Skeleton height="30px" my="10px" />
                  <Skeleton height="30px" my="10px" />
                </div>
              ) : (
                <ButtonSection
                guardList={guards}
                candyMachine={candyMachine}
                candyGuard={candyGuard!}
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
              </div>
              )}</div>
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
                <div style={{marginTop: '35px', padding: '30px'}}>
                  <Divider/>
                    <Text fontSize='200%'>
                      Mint Schedule
                    </Text>
                  <ButtonList
                  guardList={guards}
                  candyMachine={candyMachine}
                  candyGuard={candyGuard!}
                  umi={umi}
                  ownedTokens={ownedTokens}
                  setGuardList={setGuards}
                  mintsCreated={mintsCreated}
                  setMintsCreated={setMintsCreated}
                  onOpen={onShowNftOpen}
                  setCheckEligibility={setCheckEligibility}
                  />
                </div>
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

            <hr/>

            

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
