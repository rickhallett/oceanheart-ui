import React, { useRef, useEffect } from 'react';
import anime from 'animejs';

interface RippleTextProps {
  text: string;
  elementType?: React.ElementType;
}

const RippleText: React.FC<RippleTextProps> = ({ text, elementType: Element = 'h1' }) => {
  const feTurbulenceRef = useRef<SVGFETurbulenceElement | null>(null);

  useEffect(() => {
    anime({
      targets: { baseFrequency: 0.01 },
      baseFrequency: 0.03,
      easing: 'easeInOutSine',
      duration: 5000,
      direction: 'alternate',
      loop: true,
      update(anim: any) {
        const value = anim.animations[0].currentValue;
        if (feTurbulenceRef.current) {
          feTurbulenceRef.current.setAttribute('baseFrequency', value);
        }
      }
    });
  }, []);

  return (
    <>
      <Element
        style={{
          filter: 'url(#ripple-filter)',
          fontSize: '2rem',
          textAlign: 'center',
          margin: 0,
          padding: '1rem',
          opacity: 0.9,
          background: 'transparent',
          color: '#fff'
        }}
      >
        {text}
      </Element>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="ripple-filter">
          <feTurbulence
            ref={feTurbulenceRef}
            type="fractalNoise"
            baseFrequency="7"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
        </filter>
      </svg>
    </>
  );
};

export default RippleText;