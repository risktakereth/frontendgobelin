import React from 'react';

type ColorPickerProps = {
  selectedColor: string;
  onColorChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFFFFF', '#000000'];

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {colors.map((color) => (
        <div
          key={color}
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: color,
            border: selectedColor === color ? '2px solid #000' : '1px solid #ccc',
            cursor: 'pointer',
          }}
          onClick={() => onColorChange(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
