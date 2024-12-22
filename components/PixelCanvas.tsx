type PixelCanvasProps = {
  gridSize: number;
  pixels: string[];
  onPixelChange: (index: number, color: string) => void;
};

const PixelCanvas: React.FC<PixelCanvasProps> = ({ gridSize, pixels, onPixelChange }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 20px)`,
        gap: '1px',
        justifyContent: 'center',
        margin: '20px auto',
      }}
    >
      {pixels.map((color, index) => (
        <div
          key={index}
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: color,
            border: '1px solid #ccc',
          }}
          onClick={() => onPixelChange(index, color)}
        />
      ))}
    </div>
  );
};

export default PixelCanvas;
