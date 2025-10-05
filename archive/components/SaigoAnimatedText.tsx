import React, { useRef, useEffect } from 'react';
import anime from 'animejs';

interface FireTextProps {
  text: string;
  elementType?: React.ElementType;
  intensity?: number;
}

const FireText: React.FC<FireTextProps> = ({
  text,
  elementType: Element = 'h1',
  intensity = 7.0
}) => {
  const feTurbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);

  useEffect(() => {
    // Animate the turbulence for flickering flame effect
    anime({
      targets: { baseFrequency: 0.02 },
      baseFrequency: 0.05,
      easing: 'easeInOutSine',
      duration: 1500,
      direction: 'alternate',
      loop: true,
      update(anim: any) {
        const value = anim.animations[0].currentValue;
        if (feTurbulenceRef.current) {
          feTurbulenceRef.current.setAttribute('baseFrequency', value);
        }
      }
    });

    // Animate the displacement for rising flame effect
    anime({
      targets: { scale: 5 },
      scale: 15 * intensity,
      easing: 'easeInOutQuad',
      duration: 2000,
      direction: 'alternate',
      loop: true,
      update(anim: any) {
        const value = anim.animations[0].currentValue;
        if (feDisplacementMapRef.current) {
          feDisplacementMapRef.current.setAttribute('scale', value.toString());
        }
      }
    });
  }, [intensity]);

  return (
    <>
      <Element
        style={{
          filter: 'url(#fire-filter)',
          fontSize: '2rem',
          textAlign: 'center',
          margin: 0,
          padding: '1rem',
          opacity: 0.9,
          background: 'transparent',
          color: '#fff',
          position: 'relative',
          textShadow: '0 0 5px rgba(255, 120, 0, 0.8), 0 0 10px rgba(255, 60, 0, 0.6)',
          fontWeight: 'bold'
        }}
      >
        {text}
      </Element>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="fire-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ff3c00" />
            <stop offset="40%" stopColor="#ff7800" />
            <stop offset="70%" stopColor="#ffeb00" />
            <stop offset="100%" stopColor="#ffeb00" stopOpacity="0.7" />
          </linearGradient>

          <filter id="fire-filter">
            <feTurbulence
              ref={feTurbulenceRef}
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves="5"
              seed="3"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 7 -3"
              result="coloredNoise"
            />
            <feComposite
              operator="in"
              in="coloredNoise"
              in2="SourceAlpha"
              result="fire-base"
            />
            <feDisplacementMap
              ref={feDisplacementMapRef}
              in="SourceGraphic"
              in2="noise"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedText"
            />
            <feComposite
              operator="over"
              in="displacedText"
              in2="fire-base"
              result="fieryText"
            />
            <feColorMatrix
              in="fieryText"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default FireText;