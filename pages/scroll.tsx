import React, { useEffect, useRef } from "react";

const HorizontalScroll: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (!scrollContainerRef.current) return;

      // Empêcher le défilement vertical par défaut pour le conteneur horizontal
      event.preventDefault();

      // Défilement horizontal en fonction du deltaY
      scrollContainerRef.current.scrollLeft += event.deltaY;
    };

    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <style>
        {`
          body {
            background: #2d3748 !important;
            padding: 0 !important;
            height: 100vh !important;
            overflow-x: hidden; /* Empêcher le scroll horizontal global */
            background-image: 
                linear-gradient(
                  rgba(0, 0, 0, 0.3),
                  rgba(0, 0, 0, 0.35)
                ),
                url('https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmQTQaNzfAYfRcG5X1wpRLa7mi1GDF138zdp8jPXe8BWnK');
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }

          h1 {
            font-family: 'Loved', sans-serif;
            color: #ffffff;
            text-align: center;
            padding: 1rem;
          }

          .content-section {
            padding: 2rem;
            color: #fff;
            font-family: 'Freeman', sans-serif;
            font-size: 1.2rem;
            text-align: center;
            background-color: rgba(255, 255, 255, 0.1);
            margin-bottom: 1rem;
            border-radius: 8px;
          }
        `}
      </style>
      <h1>Horizontal & Vertical Scroll Example</h1>

      <div className="content-section">
        <p>Voici une section de texte pour illustrer le défilement vertical. Continuez à défiler pour voir la section de défilement horizontal.</p>
      </div>

      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          width: "100%",
          height: "300px",
          border: "1px solid #ccc",
          scrollBehavior: "smooth",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Exemple d'éléments horizontaux */}
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            style={{
              minWidth: "300px",
              height: "100%",
              backgroundColor: index % 2 === 0 ? "#6b46c1" : "#d69e2e",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#fff",
              marginRight: "10px",
              borderRadius: "8px",
            }}
          >
            Horizontal Item {index + 1}
          </div>
        ))}
      </div>

      <div className="content-section">
        <p>Vous avez terminé le défilement horizontal ! Cette section montre un retour au défilement vertical.</p>
      </div>
    </>
  );
};

export default HorizontalScroll;
