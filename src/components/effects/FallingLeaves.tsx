
import React, { useEffect, useState } from "react";

interface Leaf {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  swingSpeed: number;
  swingAmount: number;
  swingPosition: number;
}

const FallingLeaves: React.FC = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  // Generate initial leaves
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    generateLeaves();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  const generateLeaves = () => {
    const leafCount = Math.floor(width / 100); // Adjust for density
    const newLeaves: Leaf[] = [];

    for (let i = 0; i < leafCount; i++) {
      newLeaves.push(createLeaf(i));
    }

    setLeaves(newLeaves);
  };

  const createLeaf = (id: number): Leaf => {
    return {
      id,
      x: Math.random() * width,
      y: Math.random() * -height,
      size: Math.random() * 10 + 10, // 10-20px
      rotation: Math.random() * 360,
      speed: Math.random() * 1 + 0.5, // 0.5-1.5
      swingSpeed: Math.random() * 0.02 + 0.01,
      swingAmount: Math.random() * 100 + 50,
      swingPosition: Math.random() * Math.PI * 2,
    };
  };

  // Animation loop
  useEffect(() => {
    const animationFrame = requestAnimationFrame(updateLeaves);
    return () => cancelAnimationFrame(animationFrame);
  }, [leaves, height, width]);

  const updateLeaves = () => {
    setLeaves((prevLeaves) => {
      return prevLeaves.map((leaf) => {
        // Update swing position
        const newSwingPosition = leaf.swingPosition + leaf.swingSpeed;
        
        // Calculate new x position with swinging motion
        const swingOffset = Math.sin(newSwingPosition) * leaf.swingAmount;
        
        // Update y position (falling)
        let newY = leaf.y + leaf.speed;
        let newX = leaf.x + swingOffset - leaf.swingAmount / 2;
        
        // Reset if leaf is out of view
        if (newY > height) {
          newY = -30;
          newX = Math.random() * width;
        }
        
        return {
          ...leaf,
          y: newY,
          x: newX,
          swingPosition: newSwingPosition,
          rotation: leaf.rotation + 0.2,
        };
      });
    });
    
    requestAnimationFrame(updateLeaves);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.x}px`,
            top: `${leaf.y}px`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            transform: `rotate(${leaf.rotation}deg)`,
            transition: "transform 0.1s linear",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={`rgba(255, ${150 + Math.random() * 100}, 0, ${0.5 + Math.random() * 0.5})`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.9,6.2c0.3-0.2,0.5-0.5,0.5-0.9c0-0.6-0.4-1-1-1c-0.2,0-0.3,0-0.5,0.1C13.5,2.1,8.4,4.6,8,10.1 c-1.8,0.4-3.2,1.6-3.2,3.2c0,1.5,1.2,2.8,2.9,3.2C7.5,19,9.7,21,12.4,21c5,0,7.5-5.1,5.2-8.5c0.1-0.1,0.1-0.3,0.1-0.5 c0-0.5-0.5-1-1-1c-0.4,0-0.7,0.2-0.9,0.5c-0.5-0.3-1-0.4-1.6-0.4C16.7,10.2,18.8,8.6,17.9,6.2z M6.9,13.5c0-0.4,0.2-0.9,0.5-1.2 C7.5,12.8,7.5,13.2,7.5,13.5c0,0.9,0.1,1.8,0.5,2.5C7.3,15.5,6.9,14.6,6.9,13.5z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FallingLeaves;
