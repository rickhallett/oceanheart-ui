"use client";

import Image from "next/image";

const Hero = () => {

  return (
    <>
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 items-center justify-center text-center w-full lg:w-1/2">

          {/* Headline */}
          <h1 className="font-bold text-4xl lg:text-6xl tracking-tight">
            Oceanheart – <span className="text-blue-400 glow-blue">Human-Centred Transformation</span>
          </h1>

          {/* Sub-headline */}
          <div className="flex flex-col gap-3">
            <p className="text-xl font-semibold opacity-90 leading-relaxed">
              Sessions for people. <span className="text-primary">Strategies for systems.</span>
            </p>
            <p className="text-lg opacity-80 leading-relaxed mt-4">
              I help <span className="text-secondary">individuals navigate <span className="italic">inner change</span></span> and <span className="text-primary">organizations navigate <span className="italic">technological change</span></span>.
              <br />
            </p>
            <p className="text-lg opacity-80 leading-relaxed mt-4">
              Different arenas, same goal:
            </p>
          </div>

          <div className="flex flex-col gap-6 items-center w-full">
            <p className="text-lg opacity-80 leading-relaxed">
              <span className="font-bold">Amplified <span className="text-blue-400 glow-blue">Clarity</span></span>
            </p>
            <p className="text-lg opacity-80 leading-relaxed">
              <span className="font-bold">Amplified <span className="text-blue-400 glow-blue">Alignment</span></span>
            </p>
            <p className="text-lg opacity-80 leading-relaxed">
              <span className="font-bold">Amplified <span className="text-blue-400 glow-blue">Growth</span></span>
            </p>
          </div>

          {/* Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl justify-center mt-4">
            <a href="https://awake.oceanheart.ai"
              className="btn btn-primary btn-lg flex-1">
              Work with Kai – Therapy Sessions
            </a>
            <a href="/consulting"
              className="btn btn-primary btn-lg btn-outline flex-1">
              Work with Kai – AI Strategy
            </a>
          </div>

        </div>
        {/* Image Section zoom in rounded */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <div className="image-container rounded-full overflow-hidden">
            <Image
              src="/images/kai_profile.jpeg"
              alt="Kai - Conscious AI Integration Specialist"
              className="kai-image rounded-full object-cover"
              priority={true}
              width={500}
              height={500}
              style={{
                transform: "scale(1.01)",
                transformOrigin: "center",
                transition: "transform 0.5s ease-in-out",
              }}
            />
          </div>
        </div>
      </section>

      {/* Ethical Mirror Quote Section
      <section className="max-w-5xl mx-auto my-16 px-8">
        <div className="quote-container relative py-12 px-8 bg-opacity-5 bg-blue-400 backdrop-blur-sm rounded-lg border border-blue-400 border-opacity-10">
          <div className="absolute top-6 left-8 opacity-20 text-6xl text-blue-400">&quot;</div>
          <div className="text-center">
            <blockquote className="text-xl md:text-2xl font-light text-gray-100 opacity-50 leading-relaxed">
              <p className="mb-2">&quot;AI isn&apos;t a lottery ticket—it&apos;s a mirror.</p>
              <p className="mb-2">The sooner you look, the sooner you adjust the reflection.</p>
              <p>Wait too long, and you&apos;re stuck wearing yesterday&apos;s face.&quot;</p>
            </blockquote>
          </div>
          <div className="absolute bottom-6 right-8 opacity-20 text-6xl text-blue-400">&quot;</div>
        </div>
      </section> */}

      <style jsx global>{`
        .glow-blue {
          position: relative;
          color: #60a5fa;
          text-shadow: 0 0 10px rgba(96, 165, 250, 0.47), 0 0 17px rgba(96, 165, 250, 0.33);
          animation: pulse 3s infinite alternate;
        }
        
        @keyframes pulse {
          0% {
            text-shadow: 0 0 10px rgba(96, 165, 250, 0.47), 0 0 17px rgba(96, 165, 250, 0.33);
          }
          100% {
            text-shadow: 0 0 13px rgba(96, 165, 250, 0.6), 0 0 23px rgba(37, 99, 235, 0.47), 0 0 27px rgba(37, 99, 235, 0.27);
          }
        }

        .quote-container {
          box-shadow: 0 0 40px rgba(96, 165, 250, 0.1);
          transition: all 0.5s ease;
        }
        
        .quote-container:hover {
          box-shadow: 0 0 60px rgba(96, 165, 250, 0.2);
        }
        
        .image-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          overflow: hidden;
        }
        
        .kai-image {
          width: 100%;
          max-width: 100%;
          border-radius: 0.5rem;
          mask-image: radial-gradient(circle at center, black 85%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle at center, black 85%, transparent 100%);
        }
      `}</style>
    </>
  );
};

export default Hero; 