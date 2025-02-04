import {
    CandyGuard,
    CandyMachine,
    mintV2,
  } from "@metaplex-foundation/mpl-candy-machine";
  import { GuardReturn } from "../utils/checkerHelper";
  import {
    AddressLookupTableInput,
    KeypairSigner,
    PublicKey,
    Transaction,
    Umi,
    createBigInt,
    generateSigner,
    none,
    publicKey,
    signAllTransactions,
    signTransaction,
    sol,
    some,
    transactionBuilder,
  } from "@metaplex-foundation/umi";
  import {
    DigitalAsset,
    DigitalAssetWithToken,
    JsonMetadata,
    fetchDigitalAsset,
    fetchJsonMetadata,
  } from "@metaplex-foundation/mpl-token-metadata";
  import { mintText } from "../settings";
  import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    SimpleGrid,
    Text,
    Tooltip,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    VStack,
    Divider,
    createStandaloneToast,
  } from "@chakra-ui/react";
  import {
    fetchAddressLookupTable,
  } from "@metaplex-foundation/mpl-toolbox";
  import { Dispatch, SetStateAction, useEffect, useState } from "react";
  import {
    chooseGuardToUse,
    routeBuilder,
    mintArgsBuilder,
    GuardButtonList,
    buildTx,
    getRequiredCU,
  } from "../utils/mintHelper";
  import { useSolanaTime } from "@/utils/SolanaTimeContext";
  import { verifyTx } from "@/utils/verifyTx";
  import { base58 } from "@metaplex-foundation/umi/serializers";
  
  const updateLoadingText = (
    loadingText: string | undefined,
    guardList: GuardReturn[],
    label: string,
    setGuardList: Dispatch<SetStateAction<GuardReturn[]>>
  ) => {
    const guardIndex = guardList.findIndex((g) => g.label === label);
    if (guardIndex === -1) {
      console.error("guard not found");
      return;
    }
    const newGuardList = [...guardList];
    newGuardList[guardIndex].loadingText = loadingText;
    setGuardList(newGuardList);
  };
  
  const requestTwitterTweet = (message: string) => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(tweetUrl, "_blank");
  };
  
  const checkTwitterStatus = async () => {
    // Vous devrez ici ajouter une vérification si le tweet a bien été publié.
    // Simulons cette vérification avec un délai.
    await new Promise((resolve) => setTimeout(resolve, 12000)); // Simuler une attente pour vérification
    return true;
  };
  
  const fetchNft = async (
    umi: Umi,
    nftAdress: PublicKey,
  ) => {
    let digitalAsset: DigitalAsset | undefined;
    let jsonMetadata: JsonMetadata | undefined;
    try {
      digitalAsset = await fetchDigitalAsset(umi, nftAdress);
      jsonMetadata = await fetchJsonMetadata(umi, digitalAsset.metadata.uri);
    } catch (e) {
      console.error(e);
      createStandaloneToast().toast({
        title: "Nft could not be fetched!",
        description: "Please check your Wallet instead.",
        status: "info",
        duration: 900,
        isClosable: true,
      });
    }
  
    return { digitalAsset, jsonMetadata };
  };
  
  const mintClick = async (
    umi: Umi,
    guard: GuardReturn,
    candyMachine: CandyMachine,
    candyGuard: CandyGuard,
    ownedTokens: DigitalAssetWithToken[],
    mintAmount: number,
    mintsCreated:
      | {
          mint: PublicKey;
          offChainMetadata: JsonMetadata | undefined;
        }[]
      | undefined,
    setMintsCreated: Dispatch<
      SetStateAction<
        | { mint: PublicKey; offChainMetadata: JsonMetadata | undefined }[]
        | undefined
      >
    >,
    guardList: GuardReturn[],
    setGuardList: Dispatch<SetStateAction<GuardReturn[]>>,
    onOpen: () => void,
    setCheckEligibility: Dispatch<SetStateAction<boolean>>
  ) => {
  
  
  
    try {
      // Étape 1 : Demander la connexion et le tweet
      const tweetMessage = `Future Apex NFT collection on @EclipseFND is here!  🚀
  
  I just minted a @GobelinRave elixir potion for FREE !
  
  👉 a couple more and I'll be granted a WL spot...
  #Eclipse
  
  https://x.com/risktaker_eth/status/1849558058495787447`; // Remplacez par le lien de votre image
  requestTwitterTweet(tweetMessage);
  
      // Étape 2 : Vérifier le statut du tweet
      const tweetConfirmed = await checkTwitterStatus();
  
      if (!tweetConfirmed) {
        createStandaloneToast().toast({
          title: "Tweet non confirmé!",
          description: "Veuillez publier le tweet pour continuer.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      // Si tweet confirmé, procéder au mint
      // Votre logique de minting actuelle ici...
  
  
  
  
  
  
  
  
  
  
  
  
  
      
      // Affichage du toast en cas de succès
      createStandaloneToast().toast({
        title: "Mint réussi!",
        status: "success",
        duration: 3000,
      });
  
    } catch (e) {
      console.error(`minting failed because of ${e}`);
      createStandaloneToast().toast({
        title: "Échec du mint!",
        description: "Veuillez réessayer.",
        status: "error",
        duration: 900,
        isClosable: true,
      });
    } finally {
      setCheckEligibility(true); // Réinitialiser l'état d'éligibilité
    }
  
  
  
  
  
  
    
    const guardToUse = chooseGuardToUse(guard, candyGuard);
    if (!guardToUse.guards) {
      console.error("no guard defined!");
      return;
    }
  
    let buyBeer = true;
    if (!process.env.NEXT_PUBLIC_BUYMARKBEER) {
      buyBeer = false;
      console.log("The Creator does not want to pay for MarkSackerbergs beer 😒");
    }
  
    try {
      //find the guard by guardToUse.label and set minting to true
      const guardIndex = guardList.findIndex((g) => g.label === guardToUse.label);
      if (guardIndex === -1) {
        console.error("guard not found");
        return;
      }
      const newGuardList = [...guardList];
      newGuardList[guardIndex].minting = true;
      setGuardList(newGuardList);
  
      let routeBuild = await routeBuilder(umi, guardToUse, candyMachine);
      if (routeBuild) {
        createStandaloneToast().toast({
          title: "Allowlist detected. Please sign to be approved to mint.",
          status: "info",
          duration: 900,
          isClosable: true,
        });
        const latestBlockhash = await umi.rpc.getLatestBlockhash({commitment: "finalized"});
        routeBuild = routeBuild.setBlockhash(latestBlockhash)
        const builtTx = await routeBuild.buildAndSign(umi);
        const sig = await umi.rpc
          .sendTransaction(routeBuild.build(umi), { skipPreflight:true, maxRetries: 1, preflightCommitment: "finalized", commitment: "finalized" })
          .then((signature) => {
            return { status: "fulfilled", value: signature };
          })
          .catch((error) => {
            createStandaloneToast().toast({
              title: "Allow List TX failed!",
              status: "error",
              duration: 900,
              isClosable: true,
            });
            return { status: "rejected", reason: error, value: new Uint8Array };
  
          });
          if (sig.status === "fulfilled")
            await verifyTx(umi, [sig.value], latestBlockhash, "finalized");
  
      }
  
      // fetch LUT
      let tables: AddressLookupTableInput[] = [];
      const lut = process.env.NEXT_PUBLIC_LUT;
      if (lut) {
        const lutPubKey = publicKey(lut);
        const fetchedLut = await fetchAddressLookupTable(umi, lutPubKey);
        tables = [fetchedLut];
      } else {
        createStandaloneToast().toast({
          title: "The developer should really set a lookup table!",
          status: "warning",
          duration: 900,
          isClosable: true,
        });
      }
  
      const mintTxs: Transaction[] = [];
      let nftsigners = [] as KeypairSigner[];
  
      const latestBlockhash = (await umi.rpc.getLatestBlockhash({commitment: "finalized"}));
      
      const mintArgs = mintArgsBuilder(candyMachine, guardToUse, ownedTokens);
      const nftMint = generateSigner(umi);
      const txForSimulation = buildTx(
        umi,
        candyMachine,
        candyGuard,
        nftMint,
        guardToUse,
        mintArgs,
        tables,
        latestBlockhash,
        1_400_000,
        buyBeer
      );
      const requiredCu = await getRequiredCU(umi, txForSimulation);
  
      for (let i = 0; i < mintAmount; i++) {
        const nftMint = generateSigner(umi);
        nftsigners.push(nftMint);
        const transaction = buildTx(
          umi,
          candyMachine,
          candyGuard,
          nftMint,
          guardToUse,
          mintArgs,
          tables,
          latestBlockhash,
          requiredCu,
          buyBeer
        );
        console.log(transaction)
        mintTxs.push(transaction);
      }
      if (!mintTxs.length) {
        console.error("no mint tx built!");
        return;
      }
  
      updateLoadingText(`Please sign`, guardList, guardToUse.label, setGuardList);
      const signedTransactions = await signAllTransactions(
        mintTxs.map((transaction, index) => ({
          transaction,
          signers: [umi.payer, nftsigners[index]],
        }))
      );
  
      let signatures: Uint8Array[] = [];
      let amountSent = 0;
      
      const sendPromises = signedTransactions.map((tx, index) => {
        return umi.rpc
          .sendTransaction(tx, { skipPreflight:true, maxRetries: 1, preflightCommitment: "finalized", commitment: "finalized" })
          .then((signature) => {
            console.log(
              `Transaction ${index + 1} resolved with signature: ${
                base58.deserialize(signature)[0]
              }`
            );
            amountSent = amountSent + 1;
            signatures.push(signature);
            return { status: "fulfilled", value: signature };
          })
          .catch((error) => {
            console.error(`Transaction ${index + 1} failed:`, error);
            return { status: "rejected", reason: error };
          });
      });
  
      await Promise.allSettled(sendPromises);
  
      if (!(await sendPromises[0]).status === true) {
        // throw error that no tx was created
        throw new Error("no tx was created");
      }
      updateLoadingText(
        `finalizing transaction(s)`,
        guardList,
        guardToUse.label,
        setGuardList
      );
  
      createStandaloneToast().toast({
        title: `${signedTransactions.length} Transaction(s) sent!`,
        status: "success",
        duration: 3000,
      });
      
      const successfulMints = await verifyTx(umi, signatures, latestBlockhash, "finalized");
  
      updateLoadingText(
        "Fetching your NFT",
        guardList,
        guardToUse.label,
        setGuardList
      );
  
      // Filter out successful mints and map to fetch promises
      const fetchNftPromises = successfulMints.map((mintResult) =>
        fetchNft(umi, mintResult).then((nftData) => ({
          mint: mintResult,
          nftData,
        }))
      );
  
      const fetchedNftsResults = await Promise.all(fetchNftPromises);
  
      // Prepare data for setting mintsCreated
      let newMintsCreated: { mint: PublicKey; offChainMetadata: JsonMetadata }[] =
        [];
      fetchedNftsResults.map((acc) => {
        if (acc.nftData.digitalAsset && acc.nftData.jsonMetadata) {
          newMintsCreated.push({
            mint: acc.mint,
            offChainMetadata: acc.nftData.jsonMetadata,
          });
        }
        return acc;
      }, []);
  
      // Update mintsCreated only if there are new mints
      if (newMintsCreated.length > 0) {
          setMintsCreated(newMintsCreated);
          onOpen();
      }
    } catch (e) {
      console.error(`minting failed because of ${e}`);
      createStandaloneToast().toast({
        title: "Your mint failed!",
        description: "Please try again.",
        status: "error",
        duration: 900,
        isClosable: true,
      });
    } finally {
      //find the guard by guardToUse.label and set minting to true
      const guardIndex = guardList.findIndex((g) => g.label === guardToUse.label);
      if (guardIndex === -1) {
        console.error("guard not found");
        return;
      }
      const newGuardList = [...guardList];
      newGuardList[guardIndex].minting = false;
      setGuardList(newGuardList);
      setCheckEligibility(true);
      updateLoadingText(undefined, guardList, guardToUse.label, setGuardList);
    }
  };
  // new component called timer that calculates the remaining Time based on the bigint solana time and the bigint toTime difference.
  const Timer = ({
    solanaTime,
    toTime,
    setCheckEligibility,
  }: {
    solanaTime: bigint;
    toTime: bigint;
    setCheckEligibility: Dispatch<SetStateAction<boolean>>;
  }) => {
    const [remainingTime, setRemainingTime] = useState<bigint>(
      toTime - solanaTime
    );
    useEffect(() => {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          return prev - BigInt(1);
        });
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    //convert the remaining time in seconds to the amount of days, hours, minutes and seconds left
    const days = remainingTime / BigInt(86400);
    const hours = (remainingTime % BigInt(86400)) / BigInt(3600);
    const minutes = (remainingTime % BigInt(3600)) / BigInt(60);
    const seconds = remainingTime % BigInt(60);
    if (days > BigInt(0)) {
      return (
        <Text fontSize="sm" fontWeight="bold">
          {days.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          d{" "}
          {hours.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          h{" "}
          {minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          m{" "}
          {seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          s
        </Text>
      );
    }
    if (hours > BigInt(0)) {
      return (
        <Text fontSize="sm" fontWeight="bold">
          {hours.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          h{" "}
          {minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          m{" "}
          {seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          s
        </Text>
      );
    }
    if (minutes > BigInt(0) || seconds > BigInt(0)) {
      return (
        <Text fontSize="sm" fontWeight="bold">
          {minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          m{" "}
          {seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          s
        </Text>
      );
    }
    if (remainingTime === BigInt(0)) {
      setCheckEligibility(true);
    }
    return <Text></Text>;
  };
  
  type Props = {
    umi: Umi;
    guardList: GuardReturn[];
    candyMachine: CandyMachine | undefined;
    candyGuard: CandyGuard;
    ownedTokens: DigitalAssetWithToken[] | undefined;
    setGuardList: Dispatch<SetStateAction<GuardReturn[]>>;
    mintsCreated:
      | {
          mint: PublicKey;
          offChainMetadata: JsonMetadata | undefined;
        }[]
      | undefined;
    setMintsCreated: Dispatch<
      SetStateAction<
        | { mint: PublicKey; offChainMetadata: JsonMetadata | undefined }[]
        | undefined
      >
    >;
    onOpen: () => void;
    setCheckEligibility: Dispatch<SetStateAction<boolean>>;
  };
  
  
  
  // Fonction utilitaire pour trouver l'élément avec la valeur maximale auquel l'utilisateur est éligible
  function getMaxEligibleGuard(guardList: GuardReturn[]) {
    // Filtrer uniquement les guards éligibles
    const eligibleGuards = guardList.filter((guard) => guard.allowed);
  
    // Trouver le guard avec la valeur la plus élevée
    const maxEligibleGuard = eligibleGuards.reduce((maxGuard, currentGuard) => {
      const currentValue = mintText.find((elem) => elem.label === currentGuard.label)?.value;
      const maxValue = maxGuard && mintText.find((elem) => elem.label === maxGuard.label)?.value;
      
      return currentValue && maxValue && Number(currentValue) > Number(maxValue) 
        ? currentGuard 
        : maxGuard;
    }, eligibleGuards[0]);
  
    return maxEligibleGuard;
  }
  
  
  export function ButtonSection({
    umi,
    guardList,
    candyMachine,
    candyGuard,
    ownedTokens = [], // provide default empty array
    setGuardList,
    mintsCreated,
    setMintsCreated,
    onOpen,
    setCheckEligibility,
  }: Props): JSX.Element {
    const solanaTime = useSolanaTime();
    const [numberInputValues, setNumberInputValues] = useState<{
      [label: string]: number;
    }>({});
    if (!candyMachine || !candyGuard) {
      return <></>;
    }
  
    // Utiliser getMaxEligibleGuard pour obtenir le guard avec la valeur maximale auquel l'utilisateur est éligible
    const maxEligibleGuard = getMaxEligibleGuard(guardList);
    
    const [showDetails1, setShowDetails1] = useState(false);
  
    const handleNumberInputChange = (label: string, value: number) => {
      setNumberInputValues((prev) => ({ ...prev, [label]: value }));
    };
  
    // remove duplicates from guardList
    //fucked up bugfix
    let filteredGuardlist = guardList.filter(
      (elem, index, self) =>
        index === self.findIndex((t) => t.label === elem.label)
    );
    if (filteredGuardlist.length === 0) {
      return <></>;
    }
  
    // Garder seulement le guard ayant le même label que maxValueGuard
    //////////////////////////
    //////////////////////////
    /// a suppr pour tout afficher
    /////////////////////////
    /////////////////////////
    // Garder seulement le guard ayant le même label que maxEligibleGuard
    // Filtrer selon maxEligibleGuard si disponible
    const [showDetails, setShowDetails] = useState(false);
if (maxEligibleGuard) {
    filteredGuardlist = filteredGuardlist.filter(
      (guard) => guard.label === maxEligibleGuard.label
    );
  } else {
    // Si aucun guard éligible, gérer selon vos besoins
    return <Box margin={"20px 0px 5px 0px"} bg={"blue"} padding={"20px"} borderRadius={"10px"}>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
{/* Mint Text avec bouton déroulant */}
<HStack justifyContent="space-between">
<Text
  pt="2"
  fontSize="150%"
  flexDirection="row"
  textShadow="1px 1px 2px black"
  alignItems="right"
  paddingTop="0px"
  textAlign="left"
>
  {"Mint soon"}
</Text>
<Button
  size="sm"
  color="#dadada"
  bg="rgb(0,0,0,0)"
  onClick={() => setShowDetails1((prev) => !prev)} // Toggle de l'état
  _hover={{ color: "white" }}
>
  <span className="material-icons" style={{ marginRight: '5px' }}>keyboard_arrow_down</span>
</Button>
</HStack>

{showDetails1 && (
    <Box marginTop="0px" display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-end">
      <Heading size="xs" textTransform="uppercase">
        {"The Rave will launch soon !"}
      </Heading>
    </Box>
  )}

{/* Boutons et contrôles existants */}
<VStack flexDirection="row" alignItems="center" marginTop="20px">
<Tooltip label={"You cannot mint for now"} aria-label="Mint button" justifyContent="end">
  <Button
    padding="20px"
    width="100%"
    opacity="40%"
    _hover={{
      bg: "rgba(255, 255, 255, 1)",
      color: "black",
      boxShadow:
        "pink 0px 0px 4px, pink 0px 0px 8px, magenta 0px 0px 15px, magenta 0px 0px 22px",
    }}
    backgroundColor="teal.100"
  >
    {"Mint"}
  </Button>
</Tooltip>
</VStack>
</Box> // ou gérer différemment
  }
  
    // Guard "default" can only be used to mint in case no other guard exists



    if (filteredGuardlist.length > 1) {
      filteredGuardlist = guardList.filter((elem) => elem.label != "default");
    }
    let buttonGuardList = [];
    for (const guard of filteredGuardlist) {
      const text = mintText.find((elem) => elem.label === guard.label);
      // find guard by label in candyGuard
      const group = candyGuard.groups.find((elem) => elem.label === guard.label);
      let startTime = createBigInt(0);
      let endTime = createBigInt(0);
      if (group) {
        if (group.guards.startDate.__option === "Some") {
          startTime = group.guards.startDate.value.date;
        }
        if (group.guards.endDate.__option === "Some") {
          endTime = group.guards.endDate.value.date;
        }
      }
  
      let buttonElement: GuardButtonList = {
        label: guard ? guard.label : "default",
        allowed: guard.allowed,
        header: text ? text.header : "header missing in settings.tsx",
        mintText: text ? text.mintText : "mintText missing in settings.tsx",
        buttonLabel: text
          ? text.buttonLabel
          : "buttonLabel missing in settings.tsx",
        startTime,
        endTime,
        tooltip: guard.reason,
        maxAmount: guard.maxAmount,
      };
      buttonGuardList.push(buttonElement);
    }
  
    const listItems = buttonGuardList.map((buttonGuard, index) => (
      <Box key={index} margin={"20px 0px 5px 0px"} bg={"blue"} padding={"20px"} borderRadius={"10px"}>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
  {/* Mint Text avec bouton déroulant */}
  <HStack justifyContent="space-between">
    <Text
      pt="2"
      fontSize="150%"
      flexDirection="row"
      textShadow="1px 1px 2px black"
      alignItems="right"
      paddingTop="0px"
      textAlign="left"
    >
      {buttonGuard.mintText}
    </Text>
    <Button
      size="sm"
      color="#dadada"
      bg="rgb(0,0,0,0)"
      onClick={() => setShowDetails((prev) => !prev)} // Toggle de l'état
      _hover={{ color: "white" }}
    >
      <span className="material-icons" style={{ marginRight: '5px' }}>keyboard_arrow_down</span>
    </Button>
  </HStack>

  {/* Contenu déroulant */}
  {showDetails && (
    <Box marginTop="0px" display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-end">
      <Heading size="xs" textTransform="uppercase">
        {buttonGuard.header}
      </Heading>

      <Flex justifyContent="flex-end" marginTop="5px">
        {/* Affichage conditionnel pour l'heure de fin */}
        {buttonGuard.endTime > createBigInt(0) &&
          buttonGuard.endTime - solanaTime > createBigInt(0) &&
          (!buttonGuard.startTime ||
            buttonGuard.startTime - solanaTime <= createBigInt(0)) && (
            <HStack>
              <Text fontSize="sm" marginRight={"2"}>
                Ending in:{" "}
              </Text>
              <Timer
                toTime={buttonGuard.endTime}
                solanaTime={solanaTime}
                setCheckEligibility={setCheckEligibility}
              />
            </HStack>
          )}
        {/* Affichage conditionnel pour l'heure de début */}
        {buttonGuard.startTime > createBigInt(0) &&
          buttonGuard.startTime - solanaTime > createBigInt(0) &&
          (!buttonGuard.endTime ||
            solanaTime - buttonGuard.endTime <= createBigInt(0)) && (
            <HStack>
              <Text fontSize="sm" marginRight={"2"}>
                Starting in:{" "}
              </Text>
              <Timer
                toTime={buttonGuard.startTime}
                solanaTime={solanaTime}
                setCheckEligibility={setCheckEligibility}
              />
            </HStack>
          )}
      </Flex>
    </Box>
  )}

  {/* Boutons et contrôles existants */}
  <VStack flexDirection="row" alignItems="center" marginTop="20px">
    {process.env.NEXT_PUBLIC_MULTIMINT && buttonGuard.allowed ? (
      <NumberInput
        value={numberInputValues[buttonGuard.label] || 1}
        min={1}
        max={buttonGuard.maxAmount < 1 ? 1 : buttonGuard.maxAmount}
        alignItems="right"
        isDisabled={!buttonGuard.allowed}
        width="30%"
        marginRight="10px"
        onChange={(valueAsString, valueAsNumber) =>
          handleNumberInputChange(buttonGuard.label, valueAsNumber)
        }
      >
        <NumberInputField textAlign="center" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    ) : null}

    <Tooltip label={buttonGuard.tooltip} aria-label="Mint button" justifyContent="end">
      <Button
        onClick={() =>
          mintClick(
            umi,
            buttonGuard,
            candyMachine,            
            candyGuard,
            ownedTokens,
            numberInputValues[buttonGuard.label] || 1,
            mintsCreated,
            setMintsCreated,
            guardList,
            setGuardList,
            onOpen,
            setCheckEligibility
          )
        }
        key={buttonGuard.label}
        padding="20px"
        width="75%"
        _hover={{
          bg: "rgba(255, 255, 255, 1)",
          color: "black",
          boxShadow:
            "pink 0px 0px 4px, pink 0px 0px 8px, magenta 0px 0px 15px, magenta 0px 0px 22px",
        }}
        backgroundColor="teal.100"
        isDisabled={!buttonGuard.allowed}
        isLoading={
          guardList.find((elem) => elem.label === buttonGuard.label)?.minting
        }
        loadingText={
          guardList.find((elem) => elem.label === buttonGuard.label)?.loadingText
        }
      >
        {buttonGuard.buttonLabel}
      </Button>
    </Tooltip>
  </VStack>
</Box>
    ));
  
    return <>{listItems}</>;
  }
  