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


export default function Home() {
  
  const PageContent = () => {
    type TimelineEvent = {
      id: number;
      date: string | string[];
      description: string;
      position: "above" | "below";
    };
  
    const timelineData: TimelineEvent[] = [
      { id: 0, date: ["Twitter Launch", "Organic Growth"], description: "The first GoblinZ joined the Before Party. These OGz fans set the vibe for what’s to come!", position: "above" },
      { id: 1, date: ["Discord and Guild launch", "Elixir minting"], description: "GoblinZ fever takes over as the community grows and the goblins brew their magical elixirs.", position: "below" },
      { id: 2, date: ["Mint Week!"], description: "This is THE event - the rave of raves! The real madness begins.", position: "above" },
      { id: 3, date: ["GoblinZ Weekly Party 🎉"], description: "Dance, degen, and dollar signs - we rave, we thrive, we conquer the goblinverse!", position: "below" },
    ];

    //const idActuel = 3
    const [idActuel, setIdActuel] = useState(3);

  

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
                      href="/mint"
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
                      href="/test"
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
            <a href="/test" rel="noopener noreferrer" style={{marginTop: '0.83dvh', display: 'flex', justifyContent: 'center'}}>
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
  height: '100vh',
}}>
  
  
{/* Texte à droite */}
<div style={{
  color: 'white', 
  fontFamily: 'Clash',
  maxWidth: '70vh',
}}>
  {/* Titre */}
  <h1 style={{
    fontSize: '5.95dvh', 
    textShadow: '0.5dvh 0.5dvh 0dvh black', 
    marginBottom: '3.31dvh',
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
  <a href="/test" rel="noopener noreferrer" style={{marginTop: '0.83dvh', display: 'flex', justifyContent: 'center'}}>
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






















        
{/* ROADMAP */}
<div id="Roadmap" style={{ height: '105vh', background: 'radial-gradient(circle at 50% 50%, #33d822, #1dc80c)', paddingTop: '12.40dvh' }}>
      <div style={{ margin: "2dvh 0", textAlign: "center" }}>
        <h2 style={{
          color: "white",
          fontSize: '6.94dvh',
          marginBottom: "34dvh",
          textShadow: '0.5dvh 0.5dvh 0dvh black',
          fontFamily: 'Clash',
        }}>
          GOBLINZ ROADMAP
        </h2>

        <div
          style={{ position: "relative", width: "auto", margin: "0dvh 41.32dvh 0dvh 41.32dvh", height: "49.59dvh" }}
        >
          {timelineData.map((event, index) => (
            <div
              key={event.id}
              style={{
                position: "absolute",
                left: `${(index / (timelineData.length - 1)) * 100}%`,
                transform: "translateX(-50%)",
                zIndex: "10",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "5.29dvh",
                  height: "5.29dvh",
                  borderRadius: "50%",
                  backgroundColor: "#ccc",
                  border: "1dvh solid #fff",
                  margin: "auto",
                  top: "-1.5dvh",
                  position: "relative",
                }}
              />
            </div>
          ))}

          <div
            style={{
              zIndex: "10",
              top: "-0.58dvh",
              position: "absolute",
              left: 0,
              right: 0,
              height: "3.31dvh",
              backgroundColor: "#ccc",
              border: "0.5dvh solid #fff",
              background: `linear-gradient(to right, #007BFF ${(timelineData.findIndex(event => event.id === idActuel) / (timelineData.length - 1)) * 100}%, #ccc 0%)`,
            }}
          />

          {timelineData.map((event, index) => (
            <div
              key={event.id}
              style={{
                position: "absolute",
                left: `${(index / (timelineData.length - 1)) * 100}%`,
                transform: "translateX(-50%)",
                zIndex: "100",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => setIdActuel(event.id)}
            >
              <div
                style={{
                  width: "4.3dvh",
                  height: "4.3dvh",
                  borderRadius: "50%",
                  backgroundColor: index <= timelineData.findIndex(e => e.id === idActuel) ? "#007BFF" : "#ccc",
                  border: "0dvh solid #fff",
                  margin: "auto",
                  top: "-1dvh",
                  position: "relative",
                }}
              />
            </div>
          ))}

          {timelineData.map((event, index) => (
            event.id <= idActuel && (
              <div
                key={event.id}
                style={{
                  position: "absolute",
                  left: `${(index / (timelineData.length - 1)) * 100}%`,
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  fontFamily: 'Freeman',
                  zIndex: "2",
                }}
              >
                <div
                  style={{
                    marginTop: "1.32dvh",
                    fontSize: "3.7dvh",
                    color: "white",
                    position: "absolute",
                    display: "block",
                    width: "60vh",
                    left: "-30vh",
                    top: event.position === "above" ? "-28.1dvh" : "5dvh",
                  }}
                >
                  <span>
                    {Array.isArray(event.date) ? (
                      event.date.map((line, i) => (
                        <React.Fragment key={i}>
                          🍻 {line}
                          <br />
                        </React.Fragment>
                      ))
                    ) : (
                      <>
                        🍻 {event.date}
                        <br />
                      </>
                    )}
                  </span>
                  <span style={{ fontFamily: 'Loved', fontStyle: 'italic', fontWeight: '400' }}>
                    {event.description}
                  </span>
                </div>
              </div>
            )
          ))}
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








{/* FAQ */}
<div
  id="FAQ"
  style={{
    padding: '2rem',
    background: 'radial-gradient(circle at 50% 50%,rgb(55, 20, 255),rgb(7, 3, 245))',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Clash',
    color: "white",
  }}
>
  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '9dvh', textShadow: '0.66dvh 0.66dvh 0dvh black', }}>
    FAQ
  </h2>
  <div
    style={{
      maxWidth: '800px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
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
      fontSize: '1.2rem',
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
        <img src='+.svg' alt="toggle" />
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
    Goblinz est une plateforme innovante pour découvrir des contenus interactifs,
    collaboratifs et amusants. Idéale pour les passionnés de créativité et de tech !
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
      fontSize: '1.2rem',
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
        <img src='+.svg' alt="toggle" />
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
    Goblinz est une plateforme innovante pour découvrir des contenus interactifs,
    collaboratifs et amusants. Idéale pour les passionnés de créativité et de tech !
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
      fontSize: '1.2rem',
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
        <img src='+.svg' alt="toggle" />
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
    Goblinz est une plateforme innovante pour découvrir des contenus interactifs,
    collaboratifs et amusants. Idéale pour les passionnés de créativité et de tech !
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
      fontSize: '1.2rem',
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
        <img src='+.svg' alt="toggle" />
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
    Goblinz est une plateforme innovante pour découvrir des contenus interactifs,
    collaboratifs et amusants. Idéale pour les passionnés de créativité et de tech !
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
      fontSize: '1.2rem',
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
        <img src='+.svg' alt="toggle" />
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
    Goblinz est une plateforme innovante pour découvrir des contenus interactifs,
    collaboratifs et amusants. Idéale pour les passionnés de créativité et de tech !
  </p>
</details>






  </div>




  <div style={{padding: '4dvh'}}></div>





  {/* ================= BANDE CIRCULANTE =============== */}
<div
            style={{
              position: 'absolute',
              bottom: '0',
              width: '120%',
              overflow: 'hidden',
              backgroundColor: '#42a6ff',
              borderTop: "0.17dvh solid black",
              borderBottom: "0.17dvh solid black",
              transform: 'rotate(-1.7deg) translate(-5dvh, -17dvh)',
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
</div>

        





        <div
        style={{
          backgroundImage: "url('join.png')", // Définit l'image en fond
            backgroundSize: "cover", // L'image couvre tout l'espace
            backgroundRepeat: "no-repeat", // Pas de répétition
            backgroundPosition: "center", // L'image est centrée
            padding: '8.26dvh',
            fontSize: '3dvh',
        }}>
          AAA
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
