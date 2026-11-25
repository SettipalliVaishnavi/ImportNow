
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";



function GlobeScene() {
  const globe = useRef();

  useFrame((state, delta) => {
    if (globe.current) globe.current.rotation.y += delta * 0.12;
  });

  const earthTexture = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 3, 5]} intensity={2.3} />
      <group ref={globe}>
        <mesh>
          <sphereGeometry args={[2.3, 96, 96]} />
          <meshStandardMaterial map={earthTexture} roughness={1} metalness={0} />
        </mesh>

        <mesh scale={1.045}>
          <sphereGeometry args={[2.3, 64, 64]} />
          <meshBasicMaterial color="#4596ff" transparent opacity={0.09} side={THREE.BackSide} />
        </mesh>

        <mesh scale={1.075}>
          <sphereGeometry args={[2.3, 64, 64]} />
          <meshBasicMaterial color="#4b93ff" transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>

        {/* China locations */}
        <Location position={[1.62, 0.75, 1.45]} label="🇨🇳 Shanghai" />
        <Location position={[1.55, 0.52, 1.55]} label="🇨🇳 Yiwu" />
        <Location position={[1.7, 0.25, 1.4]} label="🇨🇳 Guangzhou" />

        {/* India locations */}
        <Location position={[0.15, -0.25, 2.25]} label="🇮🇳 Hyderabad" />
        <Location position={[-0.25, -0.48, 2.2]} label="🇮🇳 Chennai" />
        <Location position={[-0.55, -0.2, 2.12]} label="🇮🇳 Nhava Sheva" />

        {/* Route lines */}
        <RouteLine
          points={[
            [1.62, 0.75, 1.45],
            [1.1, 0.45, 1.9],
            [0.15, -0.25, 2.25],
          ]}
        />
        <RouteLine
          points={[
            [1.55, 0.52, 1.55],
            [0.75, 0.05, 2.05],
            [-0.25, -0.48, 2.2],
          ]}
        />
        <RouteLine
          points={[
            [1.7, 0.25, 1.4],
            [0.65, -0.05, 2.05],
            [-0.55, -0.2, 2.12],
          ]}
        />
      </group>
    </>
  );
}

function Location({ position, label }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#ef2b20" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ef2b20" transparent opacity={0.18} />
      </mesh>
      <Html distanceFactor={7} position={[0.1, 0.08, 0]}>
        <div className="globe-label">{label}</div>
      </Html>
    </group>
  );
}

function RouteLine({ points }) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...p))
  );
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(60));

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#ef2b20" linewidth={2} />
    </line>
  );
}

const services = [
  {
    number: "01",
    title: "Product sourcing",
    text: "We find verified manufacturers across Yiwu, Guangzhou, Shenzhen and Foshan, and negotiate prices on your behalf.",
    icon: "⌕",
  },
  {
    number: "02",
    title: "Factory inspection",
    text: "Our team visits the factory in person. We check licences, samples and production capacity before you pay.",
    icon: "▦",
  },
  {
    number: "03",
    title: "Quality control",
    text: "Pre-shipment checks with photo and video reports, done before the container is sealed.",
    icon: "✓",
  },
  {
    number: "04",
    title: "Shipping & logistics",
    text: "Full-container and shared-container sea freight from Chinese ports, plus air cargo for urgent orders.",
    icon: "♧",
  },
  {
    number: "05",
    title: "Customs clearance",
    text: "Documentation, duties, GST and clearance at Indian ports. No surprises when the shipment lands.",
    icon: "▤",
  },
  {
    number: "06",
    title: "Doorstep delivery",
    text: "From the port straight to your shop, warehouse, villa or site, with the container unloaded on location.",
    icon: "▱",
  },
];

const steps = [
  "Source the right factory",
  "Inspect & approve samples",
  "Quality check & loading",
  "Ocean freight",
  "Customs clearance",
  "Delivered to your door",
];

const products = [
  { title: "Electronics", icon: "⚡", color: "#e8f3f9" },
  { title: "Machinery", icon: "⚙️", color: "#e9eee9" },
  { title: "Fashion & Apparel", icon: "👗", color: "#f5e9ed" },
  { title: "Home & Lifestyle", icon: "🏠", color: "#f1ede4" },
];

function App() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="website">
      <header className="navbar">
        <a className="logo" href="#home">IMPORTNOW</a>

        <nav>
          <a href="#services">Services</a>
          <a href="#how">How it works</a>
          <a href="#products">What we import</a>
          <a href="#china">China trips</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="nav-quote">Get a free quote</a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="trust-pill">
              <span>🇨🇳</span>
              <span className="route-arrow">→</span>
              <span>🇮🇳</span>
              <span>Trusted by 500+ Indian businesses</span>
            </div>

            <h1>
              Import directly
              <br />
              from China.
              <br />
              <span>Without the</span>
              <br />
              <span>guesswork.</span>
            </h1>

            <p className="hero-description">
              Sourcing, factory inspection, shipping and customs,
              handled end to end by a team with its own company in
              Shanghai. You choose the product. We bring it to your door.
            </p>

            <div className="hero-buttons">
              <a href="#contact" className="primary-button">
                Get a free sourcing quote <span>→</span>
              </a>
              <a href="#how" className="secondary-button">See how it works</a>
            </div>

            <div className="hero-stats">
              <div><strong>500+</strong><small>Businesses<br />served</small></div>
              <div><strong>83K+</strong><small>Community on<br />Instagram</small></div>
              <div><strong>1 pc</strong><small>MOQ on many<br />products</small></div>
              <div><strong>Shanghai</strong><small>Own registered<br />company</small></div>
            </div>
          </div>

          <div className="globe-area">
            <div className="globe-glow"></div>
            <Canvas camera={{ position: [0, 0, 7], fov: 38 }}>
              <GlobeScene />
            </Canvas>
          </div>

          <div className="scroll-cue">
            <span>SCROLL</span>
            <div></div>
          </div>
        </section>

        <div className="route-marquee">
          <div className="marquee-track">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i}>
                Shanghai <b>→</b> Nhava Sheva
                &nbsp;&nbsp;&nbsp; Guangzhou <b>→</b> Chennai
                &nbsp;&nbsp;&nbsp; Shenzhen <b>→</b> Hyderabad
                &nbsp;&nbsp;&nbsp; Yiwu <b>→</b> Adilabad
                &nbsp;&nbsp;&nbsp; Foshan <b>→</b> Hyderabad
                &nbsp;&nbsp;&nbsp; Ningbo <b>→</b> Mumbai
                &nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        <section className="services-section" id="services">
          <div className="section-heading">
            <div className="eyebrow"><span></span> END-TO-END IMPORTS</div>
            <h2>One team from the <em>factory</em><br />floor to your front door.</h2>
            <p>
              Anyone can say they import from China. What you actually need is a smooth
              process, clear communication and a shipment that arrives safely.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <span className="card-number">{service.number}</span>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section" id="how">
          <div className="process-background"></div>
          <div className="process-content">
            <div className="eyebrow"><span></span> HOW IT WORKS</div>
            <h2>Watch your order<br />travel from China to India.</h2>

            <div className="process-list">
              {steps.map((step, index) => (
                <button
                  key={step}
                  className={`process-step ${activeStep === index ? "active" : ""}`}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="step-number">{index + 1}</span>
                  <div>
                    <strong>{step}</strong>
                    {activeStep === index && (
                      <p>
                        {index === 0 && "Tell us the product. We shortlist verified manufacturers and get you real prices, not middleman quotes."}
                        {index === 1 && "We arrange samples, inspect the products and help you approve before production."}
                        {index === 2 && "Our team checks quality and documents the shipment before loading."}
                        {index === 3 && "Your shipment travels from China to India with tracking and updates."}
                        {index === 4 && "We manage documentation, customs duties and clearance."}
                        {index === 5 && "Your goods are delivered to your destination."}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="port-scene">
            <div className="skyline">
              <div></div><div></div><div></div><div></div><div></div>
            </div>
            <div className="crane">
              <div className="crane-top"></div>
              <div className="crane-leg left"></div>
              <div className="crane-leg right"></div>
              <div className="crane-cross"></div>
              <div className="crane-cable"></div>
            </div>
            <div className="container-stack">
              <div className="container red"></div>
              <div className="container blue"></div>
              <div className="container yellow"></div>
              <div className="container green"></div>
            </div>
            <div className="ship">
              <div className="ship-containers">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className={`mini-container color-${i % 5}`}></div>
                ))}
              </div>
              <div className="ship-body">IMPORTNOW</div>
            </div>
            <div className="water"></div>
            <div className="live-pill"><span></span> Live shipment view</div>
          </div>

          <div className="shipment-bar">
            <span>🇨🇳 Shanghai <small>Origin port</small></span>
            <div className="shipment-line"></div>
            <span>🇮🇳 Chennai <small>Destination</small></span>
            <strong>Day 1</strong>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div className="eyebrow"><span></span> PRODUCT CATEGORIES</div>
            <h2>What we <em>import.</em></h2>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.title}>
                <div className="product-visual" style={{ background: product.color }}>
                  <span>{product.icon}</span>
                </div>
                <h3>{product.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="china-section" id="china">
          <div className="china-content">
            <div className="eyebrow"><span></span> CHINA ON THE GROUND</div>
            <h2>We have people<br />in <em>China.</em></h2>
            <p>
              Our own registered company and team in Shanghai means you have
              someone on the ground. We visit factories, inspect products and
              help make importing from China easier.
            </p>
            <a href="#contact" className="primary-button">Talk to our team →</a>
          </div>
          <div className="china-visual">
            <div className="china-card">
              <div className="china-city">上海</div>
              <strong>SHANGHAI</strong>
              <span>Our team on the ground</span>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="eyebrow"><span></span> LET'S GET STARTED</div>
          <h2>Ready to <em>import?</em></h2>
          <p>Tell us about your product and we'll help you get started.</p>
          <a href="mailto:hello@importnow.in" className="primary-button">Get a free sourcing quote →</a>
        </section>
      </main>

      <footer>
        <a className="logo" href="#home">IMPORTNOW</a>
        <span>Making global importing easier.</span>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#how">How it works</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
