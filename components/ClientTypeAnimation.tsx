'use client';

import { TypeAnimation } from 'react-type-animation';

export default function ClientTypeAnimation() {
  return (
    <TypeAnimation
      sequence={['La Historia', 1000, 'El Arte', 1000, 'La Cultura', 1000 ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="font-bold text-secondary"
    />
  );
}
