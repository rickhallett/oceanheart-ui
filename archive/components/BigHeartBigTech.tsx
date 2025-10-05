"use client";

const BigHeartBigTech = () => {
  return (
    <section className="bg-gradient-to-b from-base-100 via-purple-900/20 to-base-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <h2 className="text-4xl lg:text-6xl font-bold">
            We Need <span className="text-pink-400">Big Heart</span>
            <br />
            to Meet <span className="text-blue-400">Big Tech</span>
          </h2>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl font-medium">
            Tired of simplistic, tech-first approaches that
            <br className="hidden sm:block" />
            overlook the <span className="text-orange-400">complexity of human connection</span>?
          </p>

          {/* First Paragraph */}
          <div className="space-y-6 text-lg lg:text-xl text-base-content/90 leading-relaxed max-w-3xl mx-auto">
            <p>
              The AI revolution is here—fast, furious, and often confusing. 
              Endless tools, shifting jargon, and the pressure to adapt can feel like drowning.
            </p>

            {/* Second Paragraph */}
            <p>
              You know AI is vital, but how do you engage meaningfully without 
              losing your human core or your sanity?
            </p>

            {/* Third Paragraph */}
            <p>
              Finding guidance that truly spans both{" "}
              <span className="text-blue-400">technological fluency</span> and{" "}
              <span className="text-blue-400">depth of human understanding</span>{" "}
              is nearly impossible. Most "experts" only speak one language, 
              leaving you to navigate the chasm alone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigHeartBigTech;