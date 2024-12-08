import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
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
      date: string;
      description: string;
      position: "above" | "below";
    };
  
    const timelineData: TimelineEvent[] = [
      { id: 1, date: "2020", description: "Fait marquant 1", position: "above" },
      { id: 2, date: "2021", description: "Fait marquant 2", position: "below" },
      { id: 3, date: "2022", description: "Fait marquant 3", position: "above" },
      { id: 4, date: "2023", description: "Fait marquant 4", position: "below" },
    ];
  
    const idActuel = 3; // ID actuel, défini en dur

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

            .css-z3ruc2 {
            display: none !important;
            }

            .Home_center__O_TIN {
            padding: 0px;
            }

            body {
              //font-family: 'YouBlockhead', sans-serif;
            }

            @font-face {
              font-family: 'YouBlockhead';
              src: url('/You Blockhead.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
          `}
        </style>


        <div id="centercolonne" style={{display: 'flex', flexDirection: 'column', textAlign: 'center',}}>

        <div style={{ background: 'radial-gradient(circle at 50% 50%, blue, darkblue)', height: '100vh', position: 'relative',}}>

          {/*Menu on top*/}
          {/* Contenu du menu avec 3 éléments */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '10px 10px 10px 10px', marginTop: '15px' }}>


                <ChakraLink
                    as={NextLink}
                    style={{
                      fontFamily: 'YouBlockhead', fontSize: '16px',
                    }}
                    href="/test"
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
                      fontFamily: 'YouBlockhead', fontSize: '16px',
                    }}
                    href="/test"
                    color="white"
                    marginRight="40px"
                    padding="6px 12px 6px 12px"
                    borderRadius='4px'
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
                      fontFamily: 'YouBlockhead', fontSize: '16px',
                    }}
                    href="/test"
                    color="white"
                    marginRight="40px"
                    padding="6px 12px 6px 12px"
                    borderRadius='4px'
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
                      fontFamily: 'YouBlockhead', fontSize: '16px',
                    }}
                    href="/test"
                    color="white"
                    marginRight="80px"
                    padding="6px 12px 6px 12px"
                    borderRadius='4px'
                    transition="background-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease"
                    _hover={{
                      color: "black",
                    }}
                    >
                      FAQ
                </ChakraLink>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
              />
              {/* Icône Twitter */}
              <a href="https://x.com/GoblinzRave" target="_blank" rel="noopener noreferrer">
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
                    transform: 'rotate(-8deg) translate(-8px, -22px)', // Inclinaison de l'icône
                    transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-8deg) translate(-4px, -18px)'} // Décalage vers la droite et le bas
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-8deg) translate(-8px, -22px)'} // Rétablir la position originale
                >
                  <i className="fab fa-twitter" style={{ color: 'white', fontSize: '20px' }}></i>
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
                    transform: 'rotate(-8deg) translate(-4px, -18px)',
                  }}>
                </div>
              </a>
              {/* Icône Discord */}
              <a href="https://discord.com/invite/8wMyc76t" target="_blank" rel="noopener noreferrer">
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
              {/* Icône Guild */}
              <a href="https://guild.xyz/GoblinzRave" target="_blank" rel="noopener noreferrer">
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
                    transform: 'rotate(-8deg) translate(112px, -4px)', // Inclinaison de l'icône
                    transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-8deg) translate(116px, 0px)'} // Décalage vers la droite et le bas
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-8deg) translate(112px, -4px)'} // Rétablir la position originale
                >
                  <img src="/guild.png" alt="Guild" style={{ width: '20px', height: '20px' }} />
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
                    transform: 'rotate(-8deg) translate(116px, 0px)',
                  }}>
                </div>
              </a>

              




      
          </div>




        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: '10px 10px 10px 10px', marginTop: '15px' }}>
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
            fontFamily: 'YouBlockhead',
            fontSize: '16px',
            color: 'white',
            position: 'relative', // Positionner l'image par rapport à son parent
            top: '-30px',
            left: '-65px',
           }}>
            Welcome to
            <div
            style={{
            fontSize: '40px',
            marginBottom: '20px',
           }}>
            GOBLINZ RAVE
            </div>

            {/* Petit "Live" avec un point vert */}
            <div
                style={{
                  marginTop: '5px', // Espacement entre le bouton et le texte
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  left: '68%',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'green',
                    borderRadius: '50%', // Faire un cercle
                    marginRight: '5px', // Espacement entre le point et le texte
                  }}
                ></div>
                <span style={{ fontSize: '10px', color: 'white' }}>Live</span>
              </div>



            {/* Boutton Elixir */}
            <a href="/test" target="_blank" rel="noopener noreferrer" style={{marginTop: '5px', display: 'flex', justifyContent: 'center'}}>
              <div
                  style={{
                    zIndex: 100,
                    padding: '20px',
                    position: 'absolute',
                    backgroundColor: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                    transform: 'rotate(-2deg) translate(0px, 0px)', // Inclinaison de l'icône
                    transition: 'transform 0.3s ease', // Transition pour le mouvement au survol
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-2deg) translate(3px, 4px)'} // Décalage vers la droite et le bas
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-2deg) translate(0px, 0px)'} // Rétablir la position originale
                >
                  MINT FREE ELIXIR
                </div>
                <div
                  style={{
                    zIndex: 5,
                    padding: '20px',
                    color: 'black',
                    marginRight: '20px',
                    position: 'absolute',
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                    transform: 'rotate(-2deg) translate(12px, 4px)',
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
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <div
              style={{
                display: 'flex',
                animation: 'scroll 20s linear infinite',
                fontSize: '24px',
                color: 'white',
                padding: '10px 0',
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









        

        <div style={{backgroundColor: 'grey', paddingTop: '75px'}}>
        {/* Frise Chronologique */}
        
        <div style={{ margin: "2rem 0", textAlign: "center" }}>
          <h2 style={{ color: "white", marginBottom: "12rem" }}>GoblinZ Roadmap</h2>
          <div style={{ position: "relative", width: "80%", margin: "auto", height: "300px" }}>
            {/* Points avec bordure au fond */}
            {timelineData.map((event, index) => (
              <div
                key={event.id}
                style={{
                  position: "absolute",
                  left: `${(index / (timelineData.length - 1)) * 100}%`, // Positionnement des points
                  transform: "translateX(-50%)",
                  zIndex: "10", // Points avec bordure au fond
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#ccc", // Couleur des points
                    border: "6px solid #fff", // Bordure blanche des points
                    margin: "auto",
                    top: "-9px", // Déplacer le point au-dessus de la ligne
                    position: "relative", // Assurer le bon alignement vertical
                  }}
                />
              </div>
            ))}

            {/* Ligne principale avec bordure */}
            <div
              style={{
                zIndex: "10",  // La barre au-dessus des ronds avec bordure
                top: "-3.5px",
                position: "absolute",
                left: 0,
                right: 0,
                height: "20px",
                backgroundColor: "#ccc", // Couleur de fond de la barre
                border: "3px solid #fff", // Bordure blanche autour de la barre
                background: `linear-gradient(to right, #007BFF ${(timelineData.findIndex(event => event.id === idActuel) / (timelineData.length - 1)) * 100}%, #ccc 0%)`,
              }}
            />

            {/* Ronds sans bordure au-dessus de la barre */}
            {timelineData.map((event, index) => (
              <div
                key={event.id}
                style={{
                  position: "absolute",
                  left: `${(index / (timelineData.length - 1)) * 100}%`, // Positionnement des points
                  transform: "translateX(-50%)",
                  zIndex: "100", // Ronds sans bordure au-dessus de la barre
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: index <= timelineData.findIndex(event => event.id === idActuel) ? "#007BFF" : "#ccc", // Couleur des ronds
                    border: "0px solid #fff", // Pas de bordure
                    margin: "auto",
                    top: "-6px", // Déplacer le point au-dessus de la ligne
                    position: "relative", // Assurer le bon alignement vertical
                  }}
                />
              </div>
            ))}



            

            {/* Description et dates */}
            {timelineData.map((event, index) => (
              <div
                key={event.id}
                style={{
                  position: "absolute",
                  left: `${(index / (timelineData.length - 1)) * 100}%`, // Positionnement des points
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  zIndex: "2", // Texte des descriptions au-dessus de tout
                }}
              >
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "1.4rem",
                    color: "white",
                    position: "absolute",
                    display: "block", // Afficher les descriptions
                    top: event.position === "above" ? "-120px" : "30px",
                  }}
                >
                  <span>{event.date}</span><br/>
                  <span>{event.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>




        </div>

        <div style={{backgroundColor: 'yellow'}}>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
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
