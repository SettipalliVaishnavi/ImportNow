import React from "react";

const productCategories = [
  {
    hub: "FOSHAN HUB",
    title: "Furniture & interiors",
    icon: "🛋",
    points: [
      "Complete home and villa furniture",
      "Office desks and executive chairs",
      "Banquet hall and hotel fit-outs",
    ],
    badge: "Height-adjustable desk from ₹45,000 · MOQ 1",
  },
  {
    hub: "SHENZHEN HUB",
    title: "Electronics & tech",
    icon: "📱",
    points: [
      "LED screens and digital signage",
      "Mobile accessories in bulk",
      "Power bank rental kiosks",
    ],
    badge: "Business ideas India doesn't have yet",
  },
  {
    hub: "GUANGZHOU HUB",
    title: "EV & automotive",
    icon: "🚲",
    points: [
      "Electric scooters as kits for assembly in India",
      "Battery cells sourced separately",
      "Car LED lights with your own brand",
    ],
    badge: "Car LED private label · MOQ 500",
  },
  {
    hub: "GUZHEN HUB",
    title: "Lighting",
    icon: "💡",
    points: [
      "Decorative and architectural lighting",
      "Commercial LED fixtures",
      "Custom designs for projects",
    ],
    badge: "Direct from the lighting capital of China",
  },
  {
    hub: "YIWU HUB",
    title: "Supermarket & general goods",
    icon: "🛒",
    points: [
      "Complete store stock in one container",
      "Home, kitchen, toys and gifts",
      "Choose products over video call",
    ],
    badge: "World's largest small-goods market",
  },
  {
    hub: "PAN-CHINA",
    title: "Machinery & automation",
    icon: "⚙",
    points: [
      "Production and packaging machines",
      "Smart vending and robotic kiosks",
      "Spares and after-sales support",
    ],
    badge: "Tell us the machine, we find the factory",
  },
];

export default function Products() {
  return (
    <section className="products-section" id="products">
      <div className="products-container">
        <div className="products-heading">
          <span className="products-label">WHAT WE IMPORT</span>

          <h2>
            China has a market for
            <br />
            every industry. <span>We know</span>
            <br />
            <span>each one.</span>
          </h2>

          <p>
            Each industry has its own manufacturing hub. We take you straight
            to the source.
          </p>
        </div>

        <div className="products-grid">
          {productCategories.map((category, index) => (
            <article className="products-card" key={index}>
              <div className="products-card-content">
                <div className="products-hub">
                  <span className="china-flag">🇨🇳</span>
                  <span>{category.hub}</span>
                </div>

                <h3>{category.title}</h3>

                <ul>
                  {category.points.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </ul>

                <div className="products-badge">{category.badge}</div>
              </div>

              <div className="products-decor-icon" aria-hidden="true">
                {category.icon}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}