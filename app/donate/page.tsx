import Image from "next/image";
import config from "@/config";
import ButtonCheckout from "@/components/ButtonCheckout";

export default function DonatePage() {
  return (
    <main className="bg-base-100">
      {/* Intro Section */}
      <section className="pt-20 px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-6">
          Support Our Work
        </h1>
        <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-8">
          Your contribution helps us continue developing innovative tools for wellbeing professionals. Thank you for your support!
        </p>
      </section>

      {/* Donation Section */}
      <section className="flex flex-col items-center gap-12 max-w-3xl mx-auto px-8 py-16 bg-base-200 rounded-xl shadow-lg">
        <div className="space-y-6 text-center">
          <h2 className="font-bold text-2xl mb-4">Make a Donation</h2>
          <p className="text-base max-w-2xl">
            Your donation directly funds our ongoing development and helps keep our tools accessible for less. Every contribution, no matter the size, makes a significant impact.
          </p>
          <div className="w-full max-w-xs mx-auto mt-8">
            <ButtonCheckout
              priceId="price_1R4RHkRVLr5O3VRE6dsEzO4U"
              mode="payment"
              donate={true}
            />
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="font-bold text-3xl mb-8 text-center">How Your Support Helps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-4">Development</h3>
            <p>
              Your donation helps fund the continued development of new features and improvements to our existing tools.
            </p>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-4">Accessibility</h3>
            <p>
              We strive to make our tools accessible to all mental health professionals, regardless of their financial resources.
            </p>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-4">Innovation</h3>
            <p>
              Your support enables us to research and implement cutting-edge technologies that the provision of wellbeing services across the spectrum.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-neutral text-neutral-content py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-bold text-3xl md:text-4xl mb-6">Thank You!</h2>
          <p className="mb-8">
            Have questions about supporting our work? Reach out via email or follow us on social media.
          </p>
          <a href={`mailto:${config.resend.supportEmail}`} className="btn btn-primary btn-wide">
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
} 