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
      date: string | string[];
      description: string;
      position: "above" | "below";
    };
  
    const timelineData: TimelineEvent[] = [
      { id: 1, date: ["Twitter Launch", "Organic Growth"], description: "The first GoblinZ joined the Before Party. These OGz fans set the vibe for what’s to come!", position: "above" },
      { id: 2, date: ["Discord and Guild launch", "Elixir minting"], description: "GoblinZ fever takes over as the community grows and the goblins brew their magical elixirs.", position: "below" },
      { id: 3, date: ["Mint Week!"], description: "This is THE event - the rave of raves! The real madness begins.", position: "above" },
      { id: 4, date: ["GoblinZ Weekly Party 🎉"], description: "Dance, degen, and dollar signs - we rave, we thrive, we conquer the goblinverse!", position: "below" },
    ];
  
    //const idActuel = 2; // ID actuel, défini en dur

    // État pour suivre l'ID actuel
    const [idActuel, setIdActuel] = useState<number>(2);

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

        <div style={{ background: 'radial-gradient(circle at 50% 50%, blue, darkblue)', height: '100vh', position: 'relative',}}>

          {/*Menu on top*/}
          {/* Contenu du menu avec 3 éléments */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '10px 10px 10px 10px', marginTop: '15px' }}>


                <ChakraLink
                    as={NextLink}
                    style={{
                      fontFamily: 'Clash', fontSize: '16px',
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
                      fontFamily: 'Clash', fontSize: '16px',
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
                      fontFamily: 'Clash', fontSize: '16px',
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
                      fontFamily: 'Clash', fontSize: '16px',
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
            fontFamily: 'Clash',
            textShadow: '4px 4px 0px black',
            fontSize: '21px',
            color: 'white',
            position: 'relative', // Positionner l'image par rapport à son parent
            top: '-30px',
            left: '-65px',
           }}>
            Welcome to
            <div
            style={{
            fontSize: '52px',
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
                <span style={{ fontSize: '13px', color: 'white', 
                    textShadow: '0px 0px 0px black', }}>Live</span>
              </div>



            {/* Boutton Elixir */}
            <a href="/test" target="_blank" rel="noopener noreferrer" style={{marginTop: '5px', display: 'flex', justifyContent: 'center'}}>
              <div
                  style={{
                    zIndex: 100,
                    padding: '20px 20px 18px 20px',
                    position: 'absolute',
                    backgroundColor: 'red',
                    textShadow: '0px 0px 0px black',
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
                    padding: '20px 20px 18px 20px',
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




<div style={{
  display: 'flex', 
  alignItems: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: '#42a6ff', 
  padding: '20px',
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
    fontSize: '36px', 
    textShadow: '3px 3px 0px black', 
    marginBottom: '20px',
  }}>
    WHO ARE THE GOBLINZ?
  </h1>

  {/* Paragraphe */}
  <div style={{fontFamily: 'Freeman', fontSize: '21px',}}>
      <p style={{ marginBottom: '10px' }}>
        The Goblinz are neon-fueled chaos incarnate.
      </p>
      <p style={{ marginBottom: '10px' }}>
        We don’t sleep — we rave, we scheme, and we conquer the Eclipse night.
      </p>
      <p style={{}}>
        Let’s glow, let’s goblin, let’s rave!
      </p>
  </div>
  {/* Petit "Live" avec un point vert */}
  <div
                style={{
                  marginTop: '35px', // Espacement entre le bouton et le texte
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  left: '67%',
                }}
              >
                <div
                  style={{
                    width: '7px',
                    height: '7px',
                    backgroundColor: 'green',
                    borderRadius: '50%', // Faire un cercle
                    marginRight: '5px', // Espacement entre le point et le texte
                  }}
                ></div>
                <span style={{ fontSize: '11px', color: 'white', 
                    textShadow: '0px 0px 0px black', }}>Live</span>
              </div>
  {/* Boutton Elixir */}
  <a href="/test" target="_blank" rel="noopener noreferrer" style={{marginTop: '5px', display: 'flex', justifyContent: 'center'}}>
              <div
                  style={{
                    zIndex: 100,
                    padding: '20px 20px 18px 20px',
                    position: 'absolute',
                    backgroundColor: 'red',
                    textShadow: '0px 0px 0px black',
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
                    padding: '20px 20px 18px 20px',
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


  {/* Image à gauche */}
  <img 
    src="fete.webp" 
    alt="Fête" 
    style={{
      height: '80vh',
      width: 'auto',
      marginRight: '20px' // Espace entre l'image et le texte
    }} 
  />
</div>







        

        <div style={{background: 'radial-gradient(circle at 50% 50%, #33d822, #1dc80c)', paddingTop: '75px'}}>
        {/* Frise Chronologique */}
        
        <div style={{ margin: "2rem 0", textAlign: "center" }}>
          <h2 style={{
            color: "white",
            fontSize: '42px',
            marginBottom: "12rem",
            textShadow: '3px 3px 0px black',
            fontFamily: 'Clash',
            }}>
              GOBLINZ ROADMAP
          </h2>

          <div style={{ position: "relative", width: "auto", margin: "0px 250px 0px 250px", height: "300px",}}>
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
                  cursor: "pointer", // Indiquer que c'est cliquable
                }}
                onClick={() => setIdActuel(event.id)} // Mettre à jour l'état au clic
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: index <= timelineData.findIndex(e => e.id === idActuel) ? "#007BFF" : "#ccc", // Couleur des ronds
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
  event.id <= idActuel && ( // Afficher les éléments dont l'id est inférieur ou égal à idActuel
    <div
      key={event.id}
      style={{
        position: "absolute",
        left: `${(index / (timelineData.length - 1)) * 100}%`, // Positionnement des points
        transform: "translateX(-50%)",
        textAlign: "center",
        fontFamily: 'Freeman',
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
          width: "60vh",
          left: "-30vh",
          top: event.position === "above" ? "-170px" : "30px",
        }}
      >
        {/* Rendu des lignes de date */}
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

        {/* Description */}
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
            padding: '40px 95vh 40px 30vh',
          }}
        >
          <div style={{ textAlign: "center", fontFamily: 'Freeman', }}>
            <span style={{fontFamily: 'Clash', fontSize: '190%'}}><div>GOBLINZ<br/>WEEKLY PARTY?</div>WHAT'S IT?</span><br />


            AAAAAAAAAAAAAAA<br />
            AAAAAAAAAAAAAAA<br />
            AAAAAAAAAAAAAAA<br />
            AAAAAAAAAAAAAAA<br />
            AAAAAAAAAAAAAAA<br />
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
