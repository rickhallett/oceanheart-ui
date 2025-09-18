"use client";

import React from 'react';
import { motion } from "motion/react";
import config from "@/config";

const formatPrice = (price: number): string =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const PricingSimplified = () => {
  const services = config.services.offerings;

  return (
    <section id="pricing" className="bg-base-200 py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Choose Your AI Integration Path
          </h2>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Professional guidance tailored to your unique needs. Each path includes custom AI coach creation and personalized integration strategies.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${
                service.isFeatured ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-200' : ''
              }`}
            >
              {/* Featured Badge */}
              {service.isFeatured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge badge-primary px-4 py-2">
                    ⭐ Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Service Name */}
                <h3 className="text-2xl font-bold mb-2">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-base-content/70 text-sm mb-6">
                  {service.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">
                    £{formatPrice(service.price)}
                  </span>
                  <p className="text-sm text-base-content/60 mt-1">
                    {service.duration}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-success mt-0.5">✓</span>
                      <span className="text-base-content/80">{feature.name}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn w-full ${
                    service.isFeatured ? 'btn-primary' : 'btn-outline btn-primary'
                  }`}
                >
                  {service.isFeatured ? 'Get Started' : 'Learn More'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-base-100 rounded-xl p-8 max-w-3xl mx-auto">
            <p className="text-lg font-medium mb-2">
              Not sure which path is right for you?
            </p>
            <p className="text-base-content/70 mb-4">
              Book a free 15-minute clarity call to discuss your AI integration goals and find the perfect fit.
            </p>
            <a
              href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary link-hover"
            >
              Schedule Your Clarity Call →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSimplified;