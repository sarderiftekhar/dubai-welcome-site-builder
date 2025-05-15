import React, { useRef, useState, useEffect } from 'react';

interface SignatureCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signatureData: string) => void;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ isOpen, onClose, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
        setContext(ctx);
      }
    }
  }, [isOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    setIsDrawing(true);
    
    // Get mouse or touch position
    const { offsetX, offsetY } = getCoordinates(e);
    
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };
  
  const stopDrawing = () => {
    if (!context) return;
    
    setIsDrawing(false);
    context.closePath();
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    // Get mouse or touch position
    const { offsetX, offsetY } = getCoordinates(e);
    
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  // Helper to get coordinates for both mouse and touch events
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    let offsetX, offsetY;

    if ('touches' in e) {
      // Touch event
      if (e.touches.length > 0 && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        offsetX = e.touches[0].clientX - rect.left;
        offsetY = e.touches[0].clientY - rect.top;
      } else {
        offsetX = 0;
        offsetY = 0;
      }
    } else {
      // Mouse event
      offsetX = e.nativeEvent.offsetX;
      offsetY = e.nativeEvent.offsetY;
    }

    return { offsetX, offsetY };
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const saveSignature = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      onSave(dataUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 m-4 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Sign Here</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>
        
        <div className="border border-gray-300 rounded-md bg-gray-50 mb-4">
          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            className="w-full touch-none"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
          />
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Clear
          </button>
          <button
            onClick={saveSignature}
            className="px-4 py-2 bg-[#0066FF] text-white rounded hover:bg-[#0055DD] transition"
          >
            Save Signature
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureCanvas; 