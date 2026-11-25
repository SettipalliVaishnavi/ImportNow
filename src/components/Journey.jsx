
import React from "react";

const journeySteps = [
  {
    title: "Source the right factory",
    description:
      "Tell us the product. We shortlist verified manufacturers and get you real prices, not middleman quotes.",
  },
  {
    title: "Inspect & approve samples",
    description:
      "We inspect samples and make sure the product meets your requirements.",
  },
  {
    title: "Quality check & loading",
    description:
      "Your products are checked before they are packed and shipped.",
  },
  {
    title: "Ocean freight",
    description:
      "We manage the shipping journey from China to India.",
  },
  {
    title: "Customs clearance",
    description:
      "We handle customs and import documentation.",
  },
  {
    title: "Delivered to your door",
    description:
      "Your shipment reaches your destination safely.",
  },
];

export default function Journey() {
  return (
    <section className="journey-section" id="journey">
      <div className="journey-background"></div>

      <div className="journey-content">
        <div className="journey-left">
          <span className="journey-label">HOW IT WORKS</span>

          <h2>
            Watch your order
            <br />
            travel from China to
            <br />
            India.
          </h2>

          <div className="journey-steps">
            {journeySteps.map((step, index) => (
              <div
                className={`journey-step ${
                  index === 0 ? "active" : ""
                }`}
                key={index}
              >
                <span className="journey-number">{index + 1}</span>

                <div className="journey-step-text">
                  <h3>{step.title}</h3>
                  {index === 0 && <p>{step.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="journey-live">
          <span className="live-dot"></span>
          Live shipment view
        </div>
      </div>
    </section>
  );
}
