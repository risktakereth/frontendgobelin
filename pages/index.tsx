import React, { Dispatch, SetStateAction, useEffect, useRef, useMemo, useState } from "react";
import { useUmi } from "../utils/useUmi";
import styles from "../styles/Home.module.css";
import { guardChecker } from "../utils/checkAllowed";
import { ButtonList } from "../components/mintButton";
import { GuardReturn } from "../utils/checkerHelper";
import { ShowNft } from "../components/showNft";
import { InitializeModal } from "../components/initializeModal";
import { image, headerText } from "../settings";
import { ChakraProvider, Text, Box, Link as ChakraLink, Image, Flex, Link, Icon } from '@chakra-ui/react'; // Importez ChakraLink ici
import NextLink from 'next/link'; // Importez NextLink ici
//import StickyScrollEffect from './sticky.tsx';


export default function Home() {
  
  const PageContent = () => {
    type TimelineEvent = {
      id: number;
      date: string[];
      description: string;
      position: "above" | "below";
    };
  
    const timelineData: TimelineEvent[] = [
      { id: 0, date: ["coucou"], description:"", position: "above" },
      { id: 1, date: ["Discord and Guild launch", "Elixir minting"], description: "GoblinZ fever takes over as the community grows and the goblins brew their magical elixirs.", position: "below" },
      { id: 2, date: ["Mint Week!"], description: "This is THE event - the rave of raves! The real madness begins.", position: "above" },
      { id: 3, date: ["GoblinZ Weekly Party 🎉"], description: "Dance, degen, and dollar signs - we rave, we thrive, we conquer the goblinverse!", position: "below" },
    ];

    //const idActuel = 3
    const [idActuel, setIdActuel] = useState(0);

    const [scrollPosition, setScrollPosition] = useState(0);
    
     // Déclaration des variables
     const divRef = useRef<HTMLDivElement | null>(null);
     const divRef2 = useRef<HTMLDivElement | null>(null);
    const [offsetTop, setOffsetTop] = useState(0);
    const [offsetBottom, setOffsetBottom] = useState(0);
    const [offsetMiddle, setOffsetMiddle] = useState(0);
    const [tacPosition, setTacPosition] = useState(0);

// Logique pour récupérer la hauteur et gérer le scroll
useEffect(() => {
  
  console.log("ZZZZZZZZZZZZZZ", window);
  const updatePosition = () => {
    if (divRef.current) {
      setOffsetTop(divRef.current.getBoundingClientRect().top + window.scrollY);
      setOffsetBottom(divRef.current.getBoundingClientRect().bottom + window.scrollY); //+ ou -?
    }
    if (divRef2.current) {
      setOffsetMiddle(divRef2.current.getBoundingClientRect().top + window.scrollY);
    }
  };
  

  updatePosition(); // Initial update

  const updateTacPosition  = () => {
    updatePosition(); // Initial update
    if (!divRef2.current) return;
    if (offsetBottom !== offsetTop) {
      const width = divRef2.current.getBoundingClientRect().width;
      // Appliquer la formule pour calculer tacPosition
      const calculatedPosition = 0.82*width - 2.1 * width * (offsetMiddle - offsetTop) / (offsetBottom - offsetTop);
      setTacPosition(calculatedPosition);
    }
  };

  // Mettre à jour la position toutes les 0.1 secondes
  const intervalId = setInterval(() => {
    updatePosition(); // Mettre à jour les positions de l'élément
    updateTacPosition(); // Calculer la nouvelle position
  }, 10); // 100 ms = 0.1 sec

  return () => {
    clearInterval(intervalId); // Nettoyage de l'intervalle lorsque le composant est démonté
  };

}, [offsetTop, offsetBottom, offsetMiddle]); // Ajout des dépendances pour recalculer lors du changement de position

const horizontalOffset = tacPosition;

    return (
      <>
        <style jsx global>
          {`
            body {
              background: #2d3748 !important;
              brightness: 0;
              padding: 0 !important;
              height: 100vh !important;
              background-image: 
                  linear-gradient(
                    rgba(0, 0, 0, 0.3), /* Couche sombre plus prononcée */
                    rgba(0, 0, 0, 0.35)
                  ),
                  url('https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmQTQaNzfAYfRcG5X1wpRLa7mi1GDF138zdp8jPXe8BWnK') !important;
              background-attachment: fixed !important;
              background-size: cover !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
            }

            #centercolonne {
              margin: 0 auto;
            }

            .center {
              padding: 1.5rem 0rem 3rem 0rem !important;
            }

            .css-z3ruc2,
            .css-1r0rxag,
            .css-4x59lz {
            display: none !important;
            }

            .Home_center__O_TIN {
            padding: 0dvh;
            }

            body {
              //font-family: 'Freeman-Regular', sans-serif;
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
          `}
        </style>


        <div id="centercolonne" style={{display: 'flex', flexDirection: 'column', textAlign: 'center',}}>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', background: 'radial-gradient(circle at 50% 50%, blue, darkblue)', height: '100vh', position: 'relative',}}>

          {/*Menu on top*/}
          {/* Contenu du menu avec 3 éléments */}
          <div style={{ display: 'flex', flexDirection: 'row', fontSize: '3dvh' , alignItems: 'center', justifyContent: 'center', padding: '2dvh', marginTop: '3dvh' }}>

              <div>
                  <ChakraLink
                      as={NextLink}
                      style={{
                        fontFamily: 'Clash',
                      }}
                      href="/elixir"
                      color="white"
                      marginRight="6.61dvh"
                      padding="1dvh 2dvh"
                      borderRadius='0.66dvh'
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
                        fontFamily: 'Clash',
                      }}
                      href="/#Roadmap"
                      color="white"
                      marginRight="6.61dvh"
                      padding="1dvh 2dvh"
                      borderRadius='0.66dvh'
                      transition="background-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease"
                      _hover={{
                        color: "black",
                      }}
                      >
                        Roadmap
                  </ChakraLink>
                  <ChakraLink
                      as={NextLink}
                      style={{
                        fontFamily: 'Clash',
                      }}
                      href="/#goblinomics"
                      color="white"
                      marginRight="6.61dvh"
                      padding="1dvh 2dvh"
                      borderRadius='0.66dvh'
                      transition="background-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease"
                      _hover={{
                        color: "black",
                      }}
                      >
                        Goblinomicz
                  </ChakraLink>
                  <ChakraLink
                      as={NextLink}
                      style={{
                        fontFamily: 'Clash',
                      }}
                      href="/#FAQ"
                      color="white"
                      marginRight="6.61dvh"
                      padding="1dvh 2dvh"
                      borderRadius='0.66dvh'
                      transition="background-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease"
                      _hover={{
                        color: "black",
                      }}
                      >
                        FAQ
                  </ChakraLink>
              </div>
              <div style={{width: '25dvh',}}>
                  <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                  />
                  {/* Icône Twitter */}
                  <a href="https://x.com/GoblinzRave" rel="noopener noreferrer">
                  <div
                      style={{
                        zIndex: 100,
                        position: 'absolute',
                        width: '5.62dvh',
                        height: '5.62dvh',
                        backgroundColor: '#42a6ff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '0.83dvh',
                        transform: 'rotate(-8deg) translate(-1.32dvh, -3.63dvh)', // Inclinaison de l'icône
                        transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-8deg) translate(-0.66dvh, -2.98dvh)'} // Décalage vers la droite et le bas
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-8deg) translate(-1.32dvh, -3.63dvh)'} // Rétablir la position originale
                    >
                      <i className="fab fa-twitter" style={{ color: 'white', fontSize: '3.31dvh' }}></i>
                    </div>
                    <div
                      style={{
                        zIndex: 5,
                        marginRight: '3.31dvh',
                        position: 'absolute',
                        width: '5.62dvh',
                        height: '5.62dvh',
                        backgroundColor: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '0.83dvh',
                        transform: 'rotate(-8deg) translate(-0.66dvh, -2.98dvh)',
                      }}>
                    </div>
                  </a>
                  {/* Icône Discord */}
                  <a href="https://discord.com/invite/8wMyc76t" rel="noopener noreferrer">
                  <div
                      style={{
                        zIndex: 100,
                        position: 'absolute',
                        width: '5.62dvh',
                        height: '5.62dvh',
                        backgroundColor: '#42a6ff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '0.83dvh',
                        transform: 'rotate(8deg) translate(7.93dvh, -4.62dvh)', // Inclinaison de l'icône
                        transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(8deg) translate(8.60dvh, -3.97dvh)'} // Décalage vers la droite et le bas
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(8deg) translate(7.93dvh, -4.62dvh)'} // Rétablir la position originale
                    >
                      <i className="fab fa-discord" style={{ color: 'white', fontSize: '3.31dvh' }}></i>
                    </div>
                    <div
                      style={{
                        zIndex: 5,
                        marginRight: '3.31dvh',
                        position: 'absolute',
                        width: '5.62dvh',
                        height: '5.62dvh',
                        backgroundColor: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '0.83dvh',
                        transform: 'rotate(8deg) translate(8.6dvh, -3.97dvh)',
                      }}>
                    </div>
                  </a>
                  {/* Icône Guild */}
                  <a href="https://guild.xyz/GoblinzRave" rel="noopener noreferrer">
                  <div
                      style={{
                        zIndex: 100,
                        position: 'absolute',
                        width: '5.62dvh',
                        height: '5.62dvh',
                        backgroundColor: '#42a6ff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '0.83dvh',
                        transform: 'rotate(-8deg) translate(18.5dvh, -0.66dvh)', // Inclinaison de l'icône
                        transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-8deg) translate(19.17dvh, 0dvh)'} // Décalage vers la droite et le bas
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-8deg) translate(18.5dvh, -0.66dvh)'} // Rétablir la position originale
                    >
                      <img src="/guild.png" alt="Guild" style={{ width: '3.31dvh', height: '3.31dvh' }} />
                    </div>
                    <div
                      style={{
                        zIndex: 5,
                        marginRight: '3.31dvh',
                        position: 'absolute',
                        width: '5.62dvh',
                        height: '5.62dvh',
                        backgroundColor: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '0.83dvh',
                        transform: 'rotate(-8deg) translate(19.17dvh, 0dvh)',
                      }}>
                    </div>
                  </a>
              </div>

              




      
          </div>




        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: '1.65dvh 5dvh', marginTop: '2.48dvh' }}>
          <Image
            src="/gobelin.png"
            width="38%"
            //margin="auto"
            transition="background-color 0.5s ease, filter 0.5s ease"
            style={{
              position: 'relative', // Positionner l'image par rapport à son parent
              left: '-0%', // Déplace l'image à 20% depuis la gauche
            }}
            _hover={{
              filter: 'brightness(1.05)', // Exemple d'effet lors du survol
            }}
          />

          <div
          style={{
            fontFamily: 'Clash',
            textShadow: '0.66dvh 0.66dvh 0dvh black',
            fontSize: '3.47dvh',
            color: 'white',
            position: 'relative', // Positionner l'image par rapport à son parent
            top: '-4.96dvh',
           }}>
            Welcome to
            <div
            style={{
            fontSize: '8.6dvh',
            marginBottom: '3.31dvh',
           }}>
            GOBLINZ RAVE
            </div>

            {/* Petit "Live" avec un point vert */}
            <div
                style={{
                  marginTop: '0.83dvh', // Espacement entre le bouton et le texte
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  left: '68%',
                }}
              >
                <div
                  style={{
                    width: '1.32dvh',
                    height: '1.32dvh',
                    backgroundColor: 'green',
                    borderRadius: '50%', // Faire un cercle
                    marginRight: '0.83dvh', // Espacement entre le point et le texte
                  }}
                ></div>
                <span style={{ fontSize: '2.15dvh', color: 'white', 
                    textShadow: '0dvh 0dvh 0dvh black', }}>Live</span>
              </div>



            {/* Boutton Elixir */}
            <a href="/elixir" rel="noopener noreferrer" style={{marginTop: '0.83dvh', display: 'flex', justifyContent: 'center'}}>
              <div
                  style={{
                    zIndex: 100,
                    padding: '3.31dvh 3.31dvh 2.98dvh 3.31dvh',
                    position: 'absolute',
                    backgroundColor: 'red',
                    textShadow: '0dvh 0dvh 0dvh black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '.83dvh',
                    transform: 'rotate(-2deg) translate(0dvh, 0dvh)', // Inclinaison de l'icône
                    transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-2deg) translate(0.5dvh, 0.66dvh)'} // Décalage vers la droite et le bas
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-2deg) translate(0dvh, 0dvh)'} // Rétablir la position originale
                >
                  MINT FREE ELIXIR
                </div>
                <div
                  style={{
                    zIndex: 5,
                    padding: '3.31dvh 3.31dvh 2.98dvh 3.31dvh',
                    color: 'black',
                    marginRight: '3.31dvh',
                    position: 'absolute',
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '0.83dvh',
                    transform: 'rotate(-2deg) translate(1.99dvh, 0.66dvh)',
                  }}>MINT FREE ELIXIR
                </div>
              </a>


            <Image src="Bubble_01.png" style={{position: "absolute", width:"14%", left: "75dvh", top: "25dvh"}}></Image>

              


          </div>

        </div>


        {/* ================= BANDE CIRCULANTE =============== */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              width: '100%',
              overflow: 'hidden',
              backgroundColor: '#42a6ff',
              borderTop: "0.17dvh solid black",
              borderBottom: "0.17dvh solid black",
              transform: 'rotate(-0.7deg) translate(0dvh, 1.65dvh)',
            }}
          >
            <div
              style={{
                display: 'flex',
                animation: 'scroll 20s linear infinite',
                fontSize: '4dvh',
                color: 'white',
                padding: '1.2dvh 0',
              }}
            >
              {/* Cette div contient le texte qui défile */}
              <div
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {'GOBLINZ '.repeat(100)} {/* On répète plusieurs fois le texte */}
              </div>

              {/* Dupliquez le même texte immédiatement après pour un défilement fluide */}
              <div
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {'GOBLINZ '.repeat(30)}
              </div>
            </div>
          </div>
        </div>

<style>{`
  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`}</style>




<div style={{
  display: 'flex', 
  alignItems: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: '#42a6ff', 
  padding: '3.31dvh',
  height: '114.9dvh',
}}>
  
  
{/* Texte à droite */}
<div style={{
  color: 'white', 
  fontFamily: 'Clash',
  maxWidth: '70vh',
  margin: '0dvh 3dvh 3.31dvh 15dvh',
}}>
  <Image src="Bubble_01.png" style={{position: "absolute", width:"3%", left: "6dvh", top: "110dvh", transform: 'rotate(65deg)'}}></Image>
  <Image src="Biere_01.png" style={{position: "absolute", width:"9%", left: "4dvh", top: "124dvh", transform: 'rotate(-5deg)'}}></Image>
  <Image 
  src="Bubble_02.png" 
  style={{
    position: "absolute", 
    width: "2%", 
    left: "100dvh", 
    top: "185dvh", 
    transform: "rotate(65deg)", 
    transition: "transform 0.3s ease-in-out"
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(84deg) scale(1.2)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(65deg)"} 
/>
  {/* Titre */}
  <h1 style={{
    fontSize: '5.95dvh', 
    textShadow: '0.5dvh 0.5dvh 0dvh black',
  }}>
    WHO ARE THE GOBLINZ?
  </h1>

  {/* Paragraphe */}
  <div style={{fontFamily: 'Freeman', fontSize: '3.47dvh',}}>
      <p style={{ marginBottom: '1.65dvh' }}>
        The Goblinz are neon-fueled chaos incarnate.
      </p>
      <p style={{ marginBottom: '1.65dvh' }}>
        We don’t sleep — we rave, we scheme, and we conquer the Eclipse night.
      </p>
      <p style={{}}>
        Let’s glow, let’s goblin, let’s rave!
      </p>
  </div>
  {/* Petit "Live" avec un point vert */}
  <div
                style={{
                  marginTop: '5.79dvh', // Espacement entre le bouton et le texte
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  left: '67%',
                }}
              >
                <div
                  style={{
                    width: '1.16dvh',
                    height: '1.16dvh',
                    backgroundColor: 'green',
                    borderRadius: '50%', // Faire un cercle
                    marginRight: '0.83dvh', // Espacement entre le point et le texte
                  }}
                ></div>
                <span style={{ fontSize: '1.82dvh', color: 'white', 
                    textShadow: '0dvh 0dvh 0dvh black', }}>Live</span>
              </div>
  {/* Boutton Elixir */}
  <a href="/elixir" rel="noopener noreferrer" style={{marginTop: '0.83dvh', display: 'flex', justifyContent: 'center'}}>
              <div
                  style={{
                    zIndex: 100,
                    fontSize: '2.6dvh',
                    padding: '3.31dvh 3.31dvh 2.98dvh 3.31dvh',
                    position: 'absolute',
                    backgroundColor: 'red',
                    textShadow: '0dvh 0dvh 0dvh black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '0.83dvh',
                    transform: 'rotate(-2deg) translate(0dvh, 0dvh)', // Inclinaison de l'icône
                    transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-2deg) translate(0.5dvh, 0.66dvh)'} // Décalage vers la droite et le bas
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-2deg) translate(0dvh, 0dvh)'} // Rétablir la position originale
                >
                  MINT FREE ELIXIR
                </div>
                <div
                  style={{
                    zIndex: 5,                    
                    fontSize: '2.6dvh',
                    padding: '3.31dvh 3.31dvh 2.98dvh 3.31dvh',
                    color: 'black',
                    marginRight: '3.31dvh',
                    position: 'absolute',
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '0.83dvh',
                    transform: 'rotate(-2deg) translate(1.99dvh, 0.66dvh)',
                  }}>MINT FREE ELIXIR
                </div>
              </a>
</div>


  {/* Image à gauche */}
  <img 
    src="fete.webp" 
    alt="Fête" 
    style={{
      height: '80vh',
      width: 'auto',
      marginRight: '3.31dvh' // Espace entre l'image et le texte
    }} 
  />
</div>




<div style={{
  display: 'flex', 
  alignItems: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: '#42a6ff', 
  padding: '3.31dvh',
  height: '114.9dvh',
}}>
  
  
{/* Texte à droite */}
<div style={{
  color: 'white', 
  fontFamily: 'Clash',
  maxWidth: '70vh',
  margin: '0dvh 3dvh 3.31dvh 15dvh',
}}>
  <Image src="Bubble_01.png" style={{position: "absolute", width:"3%", left: "6dvh", top: "110dvh", transform: 'rotate(65deg)'}}></Image>
  <Image src="Biere_01.png" style={{position: "absolute", width:"9%", left: "4dvh", top: "124dvh", transform: 'rotate(-5deg)'}}></Image>
  <Image 
  src="Bubble_02.png" 
  style={{
    position: "absolute", 
    width: "2%", 
    left: "100dvh", 
    top: "185dvh", 
    transform: "rotate(65deg)", 
    transition: "transform 0.3s ease-in-out"
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(84deg) scale(1.2)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(65deg)"} 
/>
  {/* Titre */}
  <h1 style={{
    fontSize: '5.95dvh', 
    textShadow: '0.5dvh 0.5dvh 0dvh black',
  }}>
    WHO ARE THE GOBLINZ?
  </h1>

  {/* Paragraphe */}
  <div style={{fontFamily: 'Freeman', fontSize: '3.47dvh',}}>
      <p style={{ marginBottom: '1.65dvh' }}>
        The Goblinz are neon-fueled chaos incarnate.
      </p>
      <p style={{ marginBottom: '1.65dvh' }}>
        We don’t sleep — we rave, we scheme, and we conquer the Eclipse night.
      </p>
      <p style={{}}>
        Let’s glow, let’s goblin, let’s rave!
      </p>
  </div>
  {/* Petit "Live" avec un point vert */}
  <div
                style={{
                  marginTop: '5.79dvh', // Espacement entre le bouton et le texte
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  left: '67%',
                }}
              >
                <div
                  style={{
                    width: '1.16dvh',
                    height: '1.16dvh',
                    backgroundColor: 'green',
                    borderRadius: '50%', // Faire un cercle
                    marginRight: '0.83dvh', // Espacement entre le point et le texte
                  }}
                ></div>
                <span style={{ fontSize: '1.82dvh', color: 'white', 
                    textShadow: '0dvh 0dvh 0dvh black', }}>Live</span>
              </div>
  {/* Boutton Elixir */}
  <a href="/elixir" rel="noopener noreferrer" style={{marginTop: '0.83dvh', display: 'flex', justifyContent: 'center'}}>
              <div
                  style={{
                    zIndex: 100,
                    fontSize: '2.6dvh',
                    padding: '3.31dvh 3.31dvh 2.98dvh 3.31dvh',
                    position: 'absolute',
                    backgroundColor: 'red',
                    textShadow: '0dvh 0dvh 0dvh black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '0.83dvh',
                    transform: 'rotate(-2deg) translate(0dvh, 0dvh)', // Inclinaison de l'icône
                    transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-2deg) translate(0.5dvh, 0.66dvh)'} // Décalage vers la droite et le bas
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-2deg) translate(0dvh, 0dvh)'} // Rétablir la position originale
                >
                  MINT FREE ELIXIR
                </div>
                <div
                  style={{
                    zIndex: 5,                    
                    fontSize: '2.6dvh',
                    padding: '3.31dvh 3.31dvh 2.98dvh 3.31dvh',
                    color: 'black',
                    marginRight: '3.31dvh',
                    position: 'absolute',
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '0.83dvh',
                    transform: 'rotate(-2deg) translate(1.99dvh, 0.66dvh)',
                  }}>MINT FREE ELIXIR
                </div>
              </a>
</div>


  {/* Image à gauche */}
  <img 
    src="fete.webp" 
    alt="Fête" 
    style={{
      height: '80vh',
      width: 'auto',
      marginRight: '3.31dvh' // Espace entre l'image et le texte
    }} 
  />
</div>




{/* STICKY */}
{/* Ajoutez ici votre composant StickyScrollEffect<StickyScrollEffect /> */}

<div style={{ height: '450vh', backgroundColor: 'pink', position: 'relative' }}  ref={divRef} className="div-element">
      <div
        style={{
          position: 'sticky',
          top: '0dvh',
          left: 0,
          width: '100%',
          backgroundColor: 'pink',
          justifyContent: 'left',
          fontSize: '18px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '5dvh 0dvh 20dvh 0dvh',
          color: 'white',          
        }} ref={divRef2}
      >
              <div style={{
                position: 'sticky',
                fontFamily: 'Clash', 
                textShadow: '0.6dvh 0.6dvh 0.25dvh rgb(3, 0, 14)',
                fontSize: '300%',
                paddingBottom: '4dvh',
              }}>
                GOBLINZ ROADMAP
              </div>
              <div style={{
                marginTop: '5dvh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                zIndex: '20',
              }}>
                    <div style={{
                      height: '60vh',
                      padding: '8dvh',
                      backgroundImage: "url('forme.png')",
                      backgroundSize: "100% auto", // L'image couvre tout l'espace
                      backgroundRepeat: "no-repeat", // Pas de répétition
                      backgroundPosition: "center", // L'image est centrée
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      transform: `translateX(${horizontalOffset}px)`, // Appliquer la translation horizontale
                    }}>
                      <img src="/magic_beer.png"
                      style={{
                        position: 'absolute',
                        width: '22%',
                        inset: 'auto auto -1.8dvh -4.3dvw',
                      }}>
                      </img>
                        
                        <div style={{
                          fontSize: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          fontFamily: 'Freeman',
                        }}>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontFamily: 'Clash',
                            alignItems: 'center',
                            marginBottom: '15px',
                            textShadow: '0.6dvh 0.6dvh 0.25dvh rgb(3, 0, 14)',
                          }}>
                            <div style={{fontSize: '360%'}}>#1</div>
                            <div style={{fontSize: '150%', marginLeft: '20px'}}>Twitter Launch 🍻<br/>Organic Growth 🍻</div>
                          </div>
                          <div style={{fontFamily: 'Loved', fontSize: '130%'}}>
                          The first GoblinZ join the Before Party. These OGz<br/>fans set the vibe for what’s to come!
                          </div>
                        </div>
                    </div>
                    <div style={{
                      fontSize: '70%',
                      height: '10vh',
                      padding: '50px',
                      margin: '10px',
                      backgroundImage: "url('fleche.png')",
                      backgroundSize: "100% auto", // L'image couvre tout l'espace
                      backgroundRepeat: "no-repeat", // Pas de répétition
                      backgroundPosition: "center", // L'image est centrée
                      transform: `translateX(${horizontalOffset}px) rotate(0deg)`, // Appliquer la translation horizontale
                    }}>
                    </div>
                    <div style={{
                      height: '60vh',
                      padding: '8dvh',
                      backgroundImage: "url('forme.png')",
                      backgroundSize: "100% auto", // L'image couvre tout l'espace
                      backgroundRepeat: "no-repeat", // Pas de répétition
                      backgroundPosition: "center", // L'image est centrée
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      transform: `translateX(${horizontalOffset}px)`, // Appliquer la translation horizontale
                    }}>
                      <img src="/magic_beer.png"
                      style={{
                        position: 'absolute',
                        width: '22%',
                        inset: 'auto auto -1.8dvh -4.3dvw',
                      }}>
                      </img>
                        
                        <div style={{
                          fontSize: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          fontFamily: 'Freeman',
                        }}>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontFamily: 'Clash',
                            alignItems: 'center',
                            marginBottom: '15px',
                            textShadow: '0.6dvh 0.6dvh 0.25dvh rgb(3, 0, 14)',
                          }}>
                            <div style={{fontSize: '362%'}}>#2</div>
                            <div style={{fontSize: '152%', marginLeft: '20px'}}>Discord launch 🍻<br/>Elixir minting🍻</div>
                          </div>
                          <div style={{fontFamily: 'Loved', fontSize: '130%'}}>
                          GoblinZ fever takes over as the community grow<br/> and the goblins brew their magical elixirs.
                          </div>
                        </div>
                    </div>
                    <div style={{
                      fontSize: '70%',
                      height: '10vh',
                      padding: '50px',
                      margin: '10px',
                      backgroundImage: "url('fleche.png')",
                      backgroundSize: "100% auto", // L'image couvre tout l'espace
                      backgroundRepeat: "no-repeat", // Pas de répétition
                      backgroundPosition: "center", // L'image est centrée
                      transform: `translateX(${horizontalOffset}px)`, // Appliquer la translation horizontale
                    }}>
                    </div>
                    <div style={{
                      height: '60vh',
                      padding: '9dvh',
                      backgroundImage: "url('forme.png')",
                      backgroundSize: "100% auto", // L'image couvre tout l'espace
                      backgroundRepeat: "no-repeat", // Pas de répétition
                      backgroundPosition: "center", // L'image est centrée
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      transform: `translateX(${horizontalOffset}px)`, // Appliquer la translation horizontale
                    }}>
                      <img src="/magic_beer.png"
                      style={{
                        position: 'absolute',
                        width: '22%',
                        inset: 'auto auto -1.8dvh -4.3dvw',
                      }}>
                      </img>
                        
                        <div style={{
                          fontSize: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          fontFamily: 'Freeman',
                        }}>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontFamily: 'Clash',
                            alignItems: 'center',
                            marginBottom: '15px',
                            textShadow: '0.6dvh 0.6dvh 0.25dvh rgb(3, 0, 14)',
                          }}>
                            <div style={{fontSize: '365%'}}>#3</div>
                            <div style={{fontSize: '155%', marginLeft: '20px'}}>The First ever<br/>Weekly Rave ! 🍻</div>
                          </div>
                          <div style={{fontFamily: 'Loved', fontSize: '130%'}}>
                          The mighty #0 Weekly Rave 🎉<br/>Free for all : just come, enjoy and earn rewards!
                          </div>
                        </div>
                    </div>
                    
                    <div style={{
                      fontSize: '70%',
                      height: '10vh',
                      padding: '50px',
                      margin: '10px',
                      backgroundImage: "url('fleche.png')",
                      backgroundSize: "100% auto", // L'image couvre tout l'espace
                      backgroundRepeat: "no-repeat", // Pas de répétition
                      backgroundPosition: "center", // L'image est centrée
                      transform: `translateX(${horizontalOffset}px)`, // Appliquer la translation horizontale
                    }}>
                    </div>
                    <div style={{
                      height: '60vh',
                      padding: '12.5dvh',
                      backgroundImage: "url('forme.png')",
                      backgroundSize: "100% auto", // L'image couvre tout l'espace
                      backgroundRepeat: "no-repeat", // Pas de répétition
                      backgroundPosition: "center", // L'image est centrée
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      transform: `translateX(${horizontalOffset}px)`, // Appliquer la translation horizontale
                    }}>
                      <img src="/magic_beer.png"
                      style={{
                        position: 'absolute',
                        width: '22%',
                        inset: 'auto auto -1.8dvh -4.3dvw',
                      }}>
                      </img>
                        
                        <div style={{
                          fontSize: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          fontFamily: 'Freeman',
                        }}>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontFamily: 'Clash',
                            alignItems: 'center',
                            marginBottom: '15px',
                            textShadow: '0.6dvh 0.6dvh 0.25dvh rgb(3, 0, 14)',
                          }}>
                            <div style={{fontSize: '365%'}}>#4</div>
                            <div style={{fontSize: '155%', marginLeft: '20px'}}>Mint Week! 🍻</div>
                          </div>
                          <div style={{fontFamily: 'Loved', fontSize: '130%'}}>
                          This is THE event - the rave of raves!<br/>Seat your belt, the real madness begins.
                          </div>
                        </div>
                    </div>


                    <div style={{
                      fontSize: '70%',
                      height: '10vh',
                      padding: '50px',
                      margin: '10px',
                      backgroundImage: "url('fleche.png')",
                      backgroundSize: "100% auto", // L'image couvre tout l'espace
                      backgroundRepeat: "no-repeat", // Pas de répétition
                      backgroundPosition: "center", // L'image est centrée
                      transform: `translateX(${horizontalOffset}px)`, // Appliquer la translation horizontale
                    }}>
                    </div>
                    <div style={{
                      height: '60vh',
                      padding: '9dvh',
                      backgroundImage: "url('forme.png')",
                      backgroundSize: "100% auto", // L'image couvre tout l'espace
                      backgroundRepeat: "no-repeat", // Pas de répétition
                      backgroundPosition: "center", // L'image est centrée
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      transform: `translateX(${horizontalOffset}px)`, // Appliquer la translation horizontale
                    }}>
                      <img src="/magic_beer.png"
                      style={{
                        position: 'absolute',
                        width: '22%',
                        inset: 'auto auto -1.8dvh -4.3dvw',
                      }}>
                      </img>
                        
                        <div style={{
                          fontSize: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          fontFamily: 'Freeman',
                        }}>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontFamily: 'Clash',
                            alignItems: 'center',
                            marginBottom: '15px',
                            textShadow: '0.6dvh 0.6dvh 0.25dvh rgb(3, 0, 14)',
                          }}>
                            <div style={{fontSize: '352%'}}>#5</div>
                            <div style={{fontSize: '142%', marginLeft: '20px'}}>One Weekly Rave,<br/>each week 🍻</div>
                          </div>
                          <div style={{fontFamily: 'Loved', fontSize: '130%'}}>
                          Dance, degen, and dollar signs<br/>we rave, we thrive, we conquer the goblinverse!
                          </div>
                        </div>
                    </div>
              </div>



      </div>
    </div>





        

















        {/* IMAGE BAR */}
        <div
          style={{
            backgroundImage: "url('fond_bar.png')", // Définit l'image en fond
            backgroundSize: "cover", // L'image couvre tout l'espace
            backgroundRepeat: "no-repeat", // Pas de répétition
            backgroundPosition: "center", // L'image est centrée
            color: "yellow", // Si tu veux garder une couleur aussi
            height: "100vh", // Hauteur sur toute la fenêtre
            display: "flex", // Active Flexbox
            justifyContent: "center", // Centre horizontalement
            alignItems: "center", // Centre verticalement
            padding: '6.61dvh 95dvh 6.61dvh 30dvh',
          }}
        >
          <div style={{ textAlign: "center", fontFamily: 'Freeman', }}>
          <span style={{fontFamily: 'Clash', fontSize: '5.1dvh'}}><div style={{color:'white'}}>YOU SAID</div><div>WEEKLY PARTY? 🎉</div></span><br/>
          <span style={{fontFamily: 'Freeman', fontSize: '4.2dvh'}}><div style={{color:'white'}}>You may not be ready for it,</div><div>but you're gonna LOVE it.</div></span><br/>

          <a href="/#" rel="noopener noreferrer" style={{marginTop: '0.83dvh', display: 'flex', justifyContent: 'center'}}>
              <div
                  style={{
                    zIndex: 100,
                    fontSize: '4dvh',
                    padding: '3.31dvh 3.31dvh 2.98dvh 3.31dvh',
                    position: 'absolute',
                    backgroundColor: 'red',
                    textShadow: '0dvh 0dvh 0dvh black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '0.83dvh',
                    transform: 'rotate(-2deg) translate(0dvh, 0dvh)', // Inclinaison de l'icône
                    transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-2deg) translate(0.5dvh, 0.66dvh)'} // Décalage vers la droite et le bas
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-2deg) translate(0dvh, 0dvh)'} // Rétablir la position originale
                >
                  COMING SOON
                </div>
                <div
                  style={{
                    zIndex: 5,                    
                    fontSize: '4dvh',
                    padding: '3.31dvh 3.31dvh 2.98dvh 3.31dvh',
                    color: 'black',
                    marginRight: '3.31dvh',
                    position: 'absolute',
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '0.83dvh',
                    transform: 'rotate(-2deg) translate(1.99dvh, 0.66dvh)',
                  }}>COMING SOON
                </div>
              </a>


        </div>
        </div>


{/* Rôles Discord */}
<div
  style={{
    height: "120dvh",
    backgroundColor: "black",
    fontFamily: "Clash",
    color: "white",
    padding: "80px 0px 0px 0px",
    position: "relative", // Required for positioning the light ray
  }}
>
  {/* Pink Light Ray */}
  <div
    style={{
      position: "absolute",
      top: "0", // Position de départ du triangle
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(255, 255, 255, 0.5)", // Couleur rose avec transparence
      clipPath: "polygon(100% 0%, 40% 80%, 60% 80%)", // Triangle pointant vers le centre
      zIndex: 0,
      boxShadow: "0 0 50px 20px rgba(255, 255, 255, 0.7)",
    }}
  ></div>
  <div
    style={{
      position: "absolute",
      top: "0", // Position de départ du triangle
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(255, 255, 255, 0.5)", // Couleur rose avec transparence
      clipPath: "polygon(0% 0%, 40% 80%, 60% 80%)", // Triangle pointant vers le centre
      zIndex: 0,
      filter: "blur(15px)",
      boxShadow: "0 0 50px 20px rgba(255, 182, 193, 0.7)",
    }}
  ></div>
  {/* Ellipse Lumineuse */}
  <div
    style={{
      position: "absolute",
      top: "80%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "300px", // Largeur de l'ellipse
      height: "100px", // Hauteur de l'ellipse
      background: "rgba(255, 255, 255, 1)", // Blanc lumineux avec transparence
      borderRadius: "50%", // Transforme en ellipse
      boxShadow: "0 0 30px 20px rgba(255, 255, 255, 0.7)", // Effet lumineux rose autour
    }}
  ></div>


  


  {/* Title */}
  <h2
    style={{
      textAlign: "center",
      marginBottom: "1.5rem",
      fontSize: "9dvh",
      textShadow: "0.66dvh 0.66dvh 0dvh black",
      position: "relative",
      zIndex: 1, // Ensures the title is above the light ray
    }}
  >
    ROLES
  </h2>
</div>



{/* Why Eclipse */}

<div style={{ 
  height: "80dvh", 
  background: "linear-gradient(to bottom, black, rgb(7, 3, 245))", 
  display: "flex",
  alignItems: "center" ,
  flexDirection: "row",
  justifyContent: "space-evenly",
}}>
    <Image 
      src="Biere_02.png" 
      style={{ 
        position: "relative", 
        width: "25%", 
        left: "0dvh", 
        top: "0dvh", 
        transform: "rotate(8deg)" 
      }} 
    />
    <div>
      AAAA
    </div>
</div>

{/* ================= BANDE CIRCULANTE =============== */}
<div style={{backgroundColor: 'rgb(7, 3, 245)',}}>
<div
            style={{
              position: 'relative',
              bottom: '-2dvh',
              width: '120%',
              overflow: 'hidden',
              backgroundColor: '#42a6ff',
              borderTop: "0.17dvh solid black",
              borderBottom: "0.17dvh solid black",
              transform: 'rotate(1.2deg) translate(0dvh, 2dvh)',
              fontFamily: 'Clash',
              zIndex: '500',
            }}
          >
            <div
              style={{
                display: 'flex',
                animation: 'scroll 20s linear infinite',
                fontSize: '3.97dvh',
                color: 'white',
                padding: '1.65dvh 0 1.45dvh 0',
              }}
            >
              {/* Cette div contient le texte qui défile */}
              <div
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {'GOBLINZ '.repeat(100)} {/* On répète plusieurs fois le texte */}
              </div>

              {/* Dupliquez le même texte immédiatement après pour un défilement fluide */}
              <div
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {'GOBLINZ '.repeat(30)}
              </div>
            </div>
          </div>
          </div>













        





<div
  style={{
    position: "relative", // Nécessaire pour le positionnement absolu du pseudo-élément
    padding: "8.26dvh",
    fontSize: "3dvh",
    height: "88dvh",
  }}
>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100dvh",
      backgroundImage: "url('join.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      filter: "brightness(50%)", // Applique le filtre à l'image de fond
      zIndex: 0, // Derrière le contenu
      color: "white",
    }}
  ></div>
  <h2 style={{ margin: '5dvh 0dvh 7dvh 0dvh', color: "white", position: "relative", zIndex: 1, fontFamily: 'Clash', textAlign: 'center', fontSize: '9dvh', textShadow: '0.66dvh 0.66dvh 0dvh black', }}>
    JOIN THE RAVE
  </h2>
  <div
  style={{
    margin: '0dvh 0dvh 15dvh 0dvh',
    color: "white",
    position: "relative",
    zIndex: 1,
    fontFamily: 'Clash',
    textAlign: 'center',
    fontSize: '4dvh',
    textShadow: '0.66dvh 0.66dvh 0dvh black',
    }}>
AAAAAAAAAAAAa BBBBBBBBBBBBBBBBBBBBBBBb Description go
  </div>
  <div
  style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }}>

    {/* Icône Twitter */}
    <a href="https://x.com/GoblinzRave" rel="noopener noreferrer">
                  <div
                      style={{
                        zIndex: 100,
                        position: 'absolute',
                        width: '12dvh',
                        height: '12dvh',
                        backgroundColor: '#42a6ff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '0.83dvh',
                        transform: 'rotate(-8deg) translate(-1.32dvh, -3.63dvh)', // Inclinaison de l'icône
                        transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-8deg) translate(-0.4dvh, -2.6dvh)'} // Décalage vers la droite et le bas
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-8deg) translate(-1.32dvh, -3.63dvh)'} // Rétablir la position originale
                    >
                      <i className="fab fa-twitter" style={{ color: 'white', fontSize: '6.5dvh' }}></i>
                    </div>
                    <div
                      style={{
                        zIndex: 5,
                        marginRight: '3.31dvh',
                        position: 'absolute',
                        width: '12dvh',
                        height: '12dvh',
                        backgroundColor: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '0.83dvh',
                        transform: 'rotate(-8deg) translate(-0.4dvh, -2.6dvh)',
                      }}>
                    </div>
                  </a>

  </div>
</div>


        
  {/* ================= BANDE CIRCULANTE =============== */}
            <div
            style={{
              position: 'relative',
              zIndex: 10,
              bottom: '0',
              width: '120%',
              overflow: 'hidden',
              backgroundColor: '#42a6ff',
              borderTop: "0.17dvh solid black",
              borderBottom: "0.17dvh solid black",
              transform: 'rotate(-1.7deg) translate(-5dvh, 9dvh)',
              fontFamily: 'Clash',
            }}
          >
            <div
              style={{
                display: 'flex',
                animation: 'scroll 20s linear infinite',
                fontSize: '3.97dvh',
                color: 'white',
                padding: '1.65dvh 0',
              }}
            >
              {/* Cette div contient le texte qui défile */}
              <div
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {'GOBLINZ '.repeat(100)} {/* On répète plusieurs fois le texte */}
              </div>

              {/* Dupliquez le même texte immédiatement après pour un défilement fluide */}
              <div
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {'GOBLINZ '.repeat(30)}
              </div>
            </div>
          </div>




{/* FAQ */}
<div
  id="FAQ"
  style={{
    padding: '15dvh 2dvh 6dvh 2dvh',
    background: 'radial-gradient(circle at 50% 50%,rgb(55, 20, 255),rgb(7, 3, 245))',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Clash',
    color: "white",
  }}
>
<Image
src="potion_02_green.png"
style={{position: "absolute", width:"7%", left: "5dvh", top: "1232.4dvh", transform: 'rotate(5deg)'}}
onMouseEnter={(e) => {
  e.currentTarget.style.animation = "tremble 4s ease-in-out infinite";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.animation = "none";
}}>
</Image>
<style>
  {`
    @keyframes tremble {
  0% { transform: rotate(-5deg); }
  1.5% { transform: rotate(15deg); }
  3% { transform: rotate(-4.5deg); }
  4.5% { transform: rotate(14.5deg); }
  7% { transform: rotate(-4deg); }
  9% { transform: rotate(14deg); }
  12% { transform: rotate(-2deg); }
  15% { transform: rotate(13deg); }
  18% { transform: rotate(-1deg); }
  25% { transform: rotate(11deg); }
  34% { transform: rotate(0.5deg); }
  45% { transform: rotate(9.5deg); }
  60% { transform: rotate(2.5deg); }
  75% { transform: rotate(7.5deg); }
  100% { transform: rotate(5deg); }
}
  `}
</style>

<Image src="Bubble_01.png" style={{position: "absolute", width:"2%", left: "10dvh", top: "1225dvh", transform: 'rotate(-40deg)'}}></Image>
  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '9dvh', textShadow: '0.66dvh 0.66dvh 0dvh black', }}>
    FAQ
  </h2>
  <div
    style={{
      maxWidth: '165dvh',
      margin: '0dvh 12dvw 0dvh 12dvw',
      display: 'flex',
      flexDirection: 'column',
      gap: '2.8dvh',
    }}
  >

    {/* Question 1 */}
    <details
  style={{
    background: 'transparent',
    textTransform: 'uppercase',
    padding: '3dvh 6dvh',
    borderRadius: '0.3dvh',
    border: '0.7dvh solid #f3f306',
  }}
  onToggle={(e) => {
    const target = e.target as HTMLElement; // Caste e.target comme HTMLElement
    const img = target.querySelector('img');
    const p = target.querySelector('p');
  
    // Cast supplémentaire pour garantir que target est un <details> et qu'il possède la propriété `open`
    const detailsElement = target as HTMLDetailsElement;
  
    if (detailsElement.open) {
      // Modifier le src de l'image et le texte du paragraphe lorsqu'on ouvre
      if (img) img.src = '-.svg';  // Modifie le fichier source de l'image
      if (p) p.style.maxHeight = '500px';  // Par exemple, changer le texte du paragraphe
    } else {
      // Réinitialiser le src de l'image et le texte du paragraphe lorsqu'on ferme
      if (img) img.src = '+.svg';  // Rétablir le fichier source initial de l'image
      if (p) p.style.maxHeight = '0';  // Réinitialiser le texte du paragraphe
    }
  }}
  
>
  <summary
    style={{
      fontSize: '3.7dvh',
      fontWeight: 'bold',
      cursor: 'pointer',
      listStyle: 'none',
      userSelect: 'none',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div>What is GoblinZ Rave ?</div>
      <div style={{ marginLeft: '0px' }}>
        <img src="+.svg" alt="toggle" style={{ height: "5dvh" }} />
      </div>
    </div>
  </summary>
  <p
    style={{
      marginTop: '0.5rem',
      lineHeight: '1.6',
      fontFamily: 'Freeman',
      textAlign: 'left',
      fontWeight: '500',
      fontSize: '3dvh',
      maxHeight: '0', // Par défaut, on cache le contenu
      overflow: 'hidden',
      transition: 'max-height 0.5s ease', // Animation de 0.5s
    }}
  >
    Every four years, GoblinZ from across the Kingdom unite in one place to throw the wildest
    rave of the century - getting hilariously high and outrageously drunk!<br/><br/>
    This year, you've been lucky enough to receive an official invitation,
    granting you access to join the chaos alongside 1,555 other GoblinZ.
    Get ready to party like never before!
  </p>
</details>


    
    {/* Question 2 */}
    <details
  style={{
    background: 'transparent',
    textTransform: 'uppercase',
    padding: '3dvh 6dvh',
    borderRadius: '0.3dvh',
    border: '0.7dvh solid #f3f306',
  }}
  onToggle={(e) => {
    const target = e.target as HTMLElement; // Caste e.target comme HTMLElement
    const img = target.querySelector('img');
    const p = target.querySelector('p');
  
    // Cast supplémentaire pour garantir que target est un <details> et qu'il possède la propriété `open`
    const detailsElement = target as HTMLDetailsElement;
  
    if (detailsElement.open) {
      // Modifier le src de l'image et le texte du paragraphe lorsqu'on ouvre
      if (img) img.src = '-.svg';  // Modifie le fichier source de l'image
      if (p) p.style.maxHeight = '500px';  // Par exemple, changer le texte du paragraphe
    } else {
      // Réinitialiser le src de l'image et le texte du paragraphe lorsqu'on ferme
      if (img) img.src = '+.svg';  // Rétablir le fichier source initial de l'image
      if (p) p.style.maxHeight = '0';  // Réinitialiser le texte du paragraphe
    }
  }}
  
>
  <summary
    style={{
      fontSize: '3.7dvh',
      fontWeight: 'bold',
      cursor: 'pointer',
      listStyle: 'none',
      userSelect: 'none',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div>Can I buy GoblinZ NFTs for now ?</div>
      <div style={{ marginLeft: '0px' }}>
        <img src="+.svg" alt="toggle" style={{ height: "5dvh" }} />
      </div>
    </div>
  </summary>
  <p
    style={{
      marginTop: '0.5rem',
      lineHeight: '1.6',
      fontFamily: 'Freeman',
      textAlign: 'left',
      fontWeight: '500',
      fontSize: '3dvh',
      maxHeight: '0', // Par défaut, on cache le contenu
      overflow: 'hidden',
      transition: 'max-height 0.5s ease', // Animation de 0.5s
    }}
  >
   Short answer: No, you can’t.<br/>
   The best thing you can do is join us on Discord to get whitelisted.<br/>
   We pay attention to your efforts 💪
  </p>
</details>

    
    {/* Question 3 */}
    <details
  style={{
    background: 'transparent',
    textTransform: 'uppercase',
    padding: '3dvh 6dvh',
    borderRadius: '0.3dvh',
    border: '0.7dvh solid #f3f306',
  }}
  onToggle={(e) => {
    const target = e.target as HTMLElement; // Caste e.target comme HTMLElement
    const img = target.querySelector('img');
    const p = target.querySelector('p');
  
    // Cast supplémentaire pour garantir que target est un <details> et qu'il possède la propriété `open`
    const detailsElement = target as HTMLDetailsElement;
  
    if (detailsElement.open) {
      // Modifier le src de l'image et le texte du paragraphe lorsqu'on ouvre
      if (img) img.src = '-.svg';  // Modifie le fichier source de l'image
      if (p) p.style.maxHeight = '500px';  // Par exemple, changer le texte du paragraphe
    } else {
      // Réinitialiser le src de l'image et le texte du paragraphe lorsqu'on ferme
      if (img) img.src = '+.svg';  // Rétablir le fichier source initial de l'image
      if (p) p.style.maxHeight = '0';  // Réinitialiser le texte du paragraphe
    }
  }}
  
>
  <summary
    style={{
      fontSize: '3.7dvh',
      fontWeight: 'bold',
      cursor: 'pointer',
      listStyle: 'none',
      userSelect: 'none',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div>Why did you chose to build on Eclipse?</div>
      <div style={{ marginLeft: '0px' }}>
        <img src="+.svg" alt="toggle" style={{ height: "5dvh" }} />
      </div>
    </div>
  </summary>
  <p
    style={{
      marginTop: '0.5rem',
      lineHeight: '1.6',
      fontFamily: 'Freeman',
      textAlign: 'left',
      fontWeight: '500',
      fontSize: '3dvh',
      maxHeight: '0', // Par défaut, on cache le contenu
      overflow: 'hidden',
      transition: 'max-height 0.5s ease', // Animation de 0.5s
    }}
  >
    It's Solana on Ethereum bro
  </p>
</details>


    {/* Question 4 */}
    <details
  style={{
    background: 'transparent',
    textTransform: 'uppercase',
    padding: '3dvh 6dvh',
    borderRadius: '0.3dvh',
    border: '0.7dvh solid #f3f306',
  }}
  onToggle={(e) => {
    const target = e.target as HTMLElement; // Caste e.target comme HTMLElement
    const img = target.querySelector('img');
    const p = target.querySelector('p');
  
    // Cast supplémentaire pour garantir que target est un <details> et qu'il possède la propriété `open`
    const detailsElement = target as HTMLDetailsElement;
  
    if (detailsElement.open) {
      // Modifier le src de l'image et le texte du paragraphe lorsqu'on ouvre
      if (img) img.src = '-.svg';  // Modifie le fichier source de l'image
      if (p) p.style.maxHeight = '500px';  // Par exemple, changer le texte du paragraphe
    } else {
      // Réinitialiser le src de l'image et le texte du paragraphe lorsqu'on ferme
      if (img) img.src = '+.svg';  // Rétablir le fichier source initial de l'image
      if (p) p.style.maxHeight = '0';  // Réinitialiser le texte du paragraphe
    }
  }}
  
>
  <summary
    style={{
      fontSize: '3.7dvh',
      fontWeight: 'bold',
      cursor: 'pointer',
      listStyle: 'none',
      userSelect: 'none',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div>What is the vision of GoblinZ Rave ?</div>
      <div style={{ marginLeft: '0px' }}>
        <img src="+.svg" alt="toggle" style={{ height: "5dvh" }} />
      </div>
    </div>
  </summary>
  <p
    style={{
      marginTop: '0.5rem',
      lineHeight: '1.6',
      fontFamily: 'Freeman',
      textAlign: 'left',
      fontWeight: '500',
      fontSize: '3dvh',
      maxHeight: '0', // Par défaut, on cache le contenu
      overflow: 'hidden',
      transition: 'max-height 0.5s ease', // Animation de 0.5s
    }}
  >
    We’re not here for the usual "let's do a community" talk - forget that<br/>
    We’re here to party like there’s no tomorrow and stack our bags with the filthiest memecoins out there.<br/>
    The Weekly Party is going to be insane - stay tuned, more info dropping soon! 🎉
  </p>
</details>


    {/* Question 5 */}
    <details
  style={{
    background: 'transparent',
    textTransform: 'uppercase',
    padding: '3dvh 6dvh',
    borderRadius: '0.3dvh',
    border: '0.7dvh solid #f3f306',
  }}
  onToggle={(e) => {
    const target = e.target as HTMLElement; // Caste e.target comme HTMLElement
    const img = target.querySelector('img');
    const p = target.querySelector('p');
  
    // Cast supplémentaire pour garantir que target est un <details> et qu'il possède la propriété `open`
    const detailsElement = target as HTMLDetailsElement;
  
    if (detailsElement.open) {
      // Modifier le src de l'image et le texte du paragraphe lorsqu'on ouvre
      if (img) img.src = '-.svg';  // Modifie le fichier source de l'image
      if (p) p.style.maxHeight = '500px';  // Par exemple, changer le texte du paragraphe
    } else {
      // Réinitialiser le src de l'image et le texte du paragraphe lorsqu'on ferme
      if (img) img.src = '+.svg';  // Rétablir le fichier source initial de l'image
      if (p) p.style.maxHeight = '0';  // Réinitialiser le texte du paragraphe
    }
  }}
  
>
  <summary
    style={{
      fontSize: '3.7dvh',
      fontWeight: 'bold',
      cursor: 'pointer',
      listStyle: 'none',
      userSelect: 'none',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div>What is the Weekly Party?</div>
      <div style={{ marginLeft: '0px' }}>
        <img src="+.svg" alt="toggle" style={{ height: "5dvh" }} />

      </div>
    </div>
  </summary>
  <p
    style={{
      marginTop: '0.5rem',
      lineHeight: '1.6',
      fontFamily: 'Freeman',
      textAlign: 'left',
      fontWeight: '500',
      fontSize: '3dvh',
      maxHeight: '0', // Par défaut, on cache le contenu
      overflow: 'hidden',
      transition: 'max-height 0.5s ease', // Animation de 0.5s
    }}
  >
    Looks like you’re dying to know more 👀<br/><br/>
    Short answer: Weekly Parties are epic community events we host every week, filled with ETH and beer 🍺<br/>
    They’re 100% FREE - just bring your creativity and LET’S RAVE!<br/>
    The more you participate, the more you earn... 🤑🎉
  </p>
</details>



  </div>


  <div style={{padding: '4dvh'}}></div>


  <div style={{
      fontFamily: 'Clash',      
      fontSize: '2.3dvh',
      margin: '28dvh 0dvw 4dvh 0dvw',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      textTransform: 'uppercase',
      alignItems: 'center',

    }}>
      <a 
        href="/" 
        style={{ transition: "color 0.05s ease" }} 
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "black"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "inherit"}
      >
        Website
      </a>
      <Image 
        src="stick.svg" 
        style={{ 
          margin: '0dvh 2.5dvw',
          height: '3.5dvh',
          width: 'auto',
        }} 
      />
      <a 
        href="https://x.com/goblinzrave" 
        style={{ transition: "color 0.05s ease" }} 
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "black"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "inherit"}

      >
        Twitter
      </a>
      <Image 
        src="stick.svg" 
        style={{ 
          margin: '0dvh 2.5dvw',
          height: '3.5dvh',
          width: 'auto',
        }} 
      />
      <a 
        href="/" 
        style={{ transition: "color 0.05s ease" }} 
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "black"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "inherit"}
        
      >
        Discord
      </a>
      <Image 
        src="stick.svg" 
        style={{ 
          margin: '0dvh 2.5dvw',
          height: '3.5dvh',
          width: 'auto',
        }} 
      />
      <a 
        href="/" 
        style={{ transition: "color 0.05s ease" }} 
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "black"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "inherit"}
        
      >
        Guild
      </a>
      <Image 
        src="stick.svg" 
        style={{ 
          margin: '0dvh 2.5dvw',
          height: '3.5dvh',
          width: 'auto',
        }} 
      />
      <a 
        href="/#FAQ" 
        style={{ transition: "color 0.05s ease" }} 
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "black"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "inherit"}
        
      >
        FAQ
      </a>
      <Image 
        src="stick.svg" 
        style={{ 
          margin: '0dvh 2.5dvw',
          height: '3.5dvh',
          width: 'auto',
        }} 
      />
      <a 
        href="/#goblinomics" 
        style={{ transition: "color 0.05s ease" }} 
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "black"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "inherit"}
        
      >
        Goblinomics
      </a>
    </div>


  <div style={{
      fontFamily: 'Freeman',
      fontSize: '2.7dvh',
      marginBottom: '4dvh',
      padding: '0dvh 12dvw 0dvh 12dvw',

    }}>
      Disclaimer : GoblinzRave is a NFT project created for fun and exprimentation,
      with absolutely no intrinsic value or any expectation of financial return.
      The whole project is for entertainment purposes only and we are not reponsible
      for any financial loss. Let's fucking rave!
    </div>

    <div style={{
      fontFamily: 'Freeman',      
      fontSize: '3.5dvh',
      marginBottom: '8dvh',

    }}>
      2025 GoblinzRave. All right reserved.
    </div>



</div>








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
