import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Canva: React.FC = () => {
  const [pixels, setPixels] = useState<string[][]>([]);
  const [selectedColor, setSelectedColor] = useState('#000000'); // Couleur par défaut

  // Charger les données depuis le backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/canva')
      .then((response) => setPixels(response.data.pixels))
      .catch((error) => console.error('Erreur lors du chargement des données:', error));
  }, []);

  // Gestion du clic sur un pixel
  const handlePixelClick = (rowIndex: number, colIndex: number) => {
    const updatedPixels = [...pixels];
    updatedPixels[rowIndex][colIndex] = selectedColor;
    setPixels(updatedPixels);
  };

  // Sauvegarder les modifications
  const handleSave = () => {
    axios.post('http://localhost:5000/api/canva', { pixels })
      .then(() => alert('Données sauvegardées avec succès !'))
      .catch((error) => console.error('Erreur lors de la sauvegarde des données:', error));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Mon Canva</h1>

      {/* Sélecteur de couleur */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Choisissez une couleur :{' '}
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        </label>
      </div>

      {/* Affichage de la grille */}
      {pixels.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${pixels[0].length}, 20px)`,
            justifyContent: 'center',
            margin: '20px auto',
          }}
        >
          {pixels.map((row, rowIndex) =>
            row.map((color, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handlePixelClick(rowIndex, colIndex)}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                  cursor: 'pointer',
                }}
              />
            ))
          )}
        </div>
      )}

      {/* Bouton de sauvegarde */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSave} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default Canva;
