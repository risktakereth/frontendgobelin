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
import { ButtonSection } from "../components/mintsection";
import { ElixirSection } from "../components/mintElixir";
import { GuardReturn } from "../utils/checkerHelper";
import { ShowNft } from "../components/showNft";
import { InitializeModal } from "../components/initializeModal";
import { image, headerText } from "../settings";
import { useSolanaTime } from "@/utils/SolanaTimeContext";

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
  }, [umi, checkEligibility, firstRun]);

  const PageContent = () => {
    return (
      <>
        <style jsx global>
          {`
      body {
          background: radial-gradient(circle at 50% 50%, grey, black);
          padding: 0;
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
        margin: '10px 0px 0px 0px',
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
              <a
                href="/"
                style={{
                  textAlign: 'left',
                  color: 'white',
                  fontWeight: '300',
                  textDecoration: 'none',
                  cursor: 'pointer',
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
              </a>
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
