"use client";

import React from 'react';
import { motion } from "motion/react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { MovingBorder } from "@/components/ui/moving-border";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import config from "@/config";

const formatPrice = (price: number): string =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const PricingEnhanced = () => {
  const services = config.services.offerings;

  return (
    <section id="pricing" className="relative bg-base-200 overflow-hidden py-24">
      <BackgroundBeams className="opacity-30" />
      
      <div className="relative z-10 px-8 max-w-7xl mx-auto">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <TextGenerateEffect
            words="Choose Your AI Integration Path"
            className="text-4xl lg:text-6xl font-bold tracking-tight mb-4"
            duration={0.5}
          />
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Professional guidance tailored to your unique needs. Each path includes custom AI coach creation and personalized integration strategies.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CardContainer className="inter-var">
                <CardBody className={`bg-base-100 relative group/card hover:shadow-2xl hover:shadow-primary/[0.1] border-base-content/[0.1] w-full h-full rounded-xl p-6 border ${
                  service.isFeatured ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-200' : ''
                }`}>
                  {/* Featured Badge */}
                  {service.isFeatured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-50">
                      <MovingBorder duration={3000} className="px-4 py-2">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          ⭐ Most Popular
                        </span>
                      </MovingBorder>
                    </div>
                  )}

                  {/* Service Name */}
                  <CardItem
                    translateZ="50"
                    className="text-xl lg:text-2xl font-bold text-base-content mb-2"
                  >
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {service.name}
                    </span>
                  </CardItem>

                  {/* Description */}
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-base-content/80 text-sm max-w-sm mt-2 mb-4"
                  >
                    {service.description}
                  </CardItem>

                  {/* Price */}
                  <CardItem translateZ="100" className="mb-4">
                    <div className="flex items-end gap-2">
                      <motion.span
                        initial={{ scale: 1 }}
                        whileInView={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-extrabold tracking-tight"
                      >
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          £{formatPrice(service.price)}
                        </span>
                      </motion.span>
                    </div>
                    <p className="text-sm text-base-content/70 font-medium mt-1">
                      {service.duration}
                    </p>
                  </CardItem>

                  {/* Features List */}
                  <CardItem
                    translateZ="80"
                    className="mb-6"
                  >
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.1 + featureIndex * 0.05 + 0.5 
                          }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-success mt-0.5">✓</span>
                          <span className="text-sm text-base-content/80">{feature.name}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardItem>

                  {/* CTA Button */}
                  <CardItem
                    translateZ={20}
                    className="mt-auto"
                  >
                    <a
                      href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      {service.isFeatured ? (
                        <HoverBorderGradient
                          containerClassName="w-full rounded-lg"
                          className="bg-base-100 text-base-content flex items-center justify-center space-x-2 px-4 py-3 font-bold"
                        >
                          <span>Get Started</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </HoverBorderGradient>
                      ) : (
                        <button className="btn btn-outline btn-primary w-full">
                          Learn More
                        </button>
                      )}
                    </a>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-3xl mx-auto">
            <MovingBorder duration={5000} className="p-6">
              <p className="text-lg font-medium mb-2">
                Not sure which path is right for you?
              </p>
              <p className="text-base-content/80 mb-4">
                Book a free 15-minute clarity call to discuss your AI integration goals and find the perfect fit.
              </p>
              <a
                href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-focus transition-colors font-medium"
              >
                Schedule Your Clarity Call
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </MovingBorder>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingEnhanced;