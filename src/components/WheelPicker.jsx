// WheelPicker.jsx
import { useState } from 'react';
import '../styling/WheelPicker.css';

export default function WheelPicker({ items = [] }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const spinWheel = () => {
    if (isSpinning || items.length === 0) return;

    const degreesPerItem = 360 / items.length;
    const extraSpins = 5;
    const targetIndex = Math.floor(Math.random() * items.length);
    const finalRotation = 365 * extraSpins - targetIndex * degreesPerItem;

    setRotation((prev) => prev + finalRotation);
    setIsSpinning(true);
    
    setTimeout(() => {
      setIsSpinning(false);

      const totalRotation = (rotation + finalRotation) % 360;
      const pointerOffest = 28;
      let selectedIndex = Math.round((360 - totalRotation + pointerOffest) / degreesPerItem) % items.length;

      if (selectedIndex < 0) selectedIndex += items.length;
  

      setSelectedItem(items[selectedIndex]);

    }, 4000);
  };

  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#F67019',
    '#00A86B',
    '#DB7093',
  ];


  const angle = 360 / items.length;
  const segmentBackground = items
  .map((_, i) => {
    const start = (100 / items.length) * i;
    const end = (100 / items.length) * (i + 1);
    const color = colors[i % colors.length];
    return `${color} ${start}% ${end}%`;
  })
  .join(', ');

   return (
    <>
    
      <div className="body">
        <div className="container">

          <div className="pointer" onClick={spinWheel}>Spin </div>

          <div
            className="wheel"
            onClick={spinWheel}
            
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)'
                : 'none',
            }}
            
            
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="number"
                style={{
                  '--i': `${index}`,
                  '--angle': `${angle}deg`,
                }}
              >
                <span>{item.name}</span>
              </div>
            ))}

          </div>

        </div>
          {selectedItem && (
            <div className="selected-item" style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--orange)' }}>
              Selected: {selectedItem.name}
            </div>
          )}
      </div>
    </>
    
  );
}