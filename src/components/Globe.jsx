import { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

const EARTH_TEXTURE =
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";

const CLOUD_TEXTURE =
  "https://threejs.org/examples/textures/planets/earth_clouds_1024.png";

const earthRadius = 2;

function latLonToVector(lat, lon, radius = 2.02) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Earth() {
  const earthRef = useRef();
  const cloudRef = useRef();

  const [earthTexture, cloudTexture] = useLoader(THREE.TextureLoader, [
    EARTH_TEXTURE,
    CLOUD_TEXTURE,
  ]);

  useMemo(() => {
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    cloudTexture.colorSpace = THREE.SRGBColorSpace;
  }, [earthTexture, cloudTexture]);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.12;
    }

    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.14;
    }
  });

  return (
    <>
      {/* Realistic Earth */}
      <Sphere ref={earthRef} args={[earthRadius, 96, 96]}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={1}
          metalness={0}
        />
      </Sphere>

      {/* Moving cloud layer */}
      <Sphere ref={cloudRef} args={[2.015, 96, 96]}>
        <meshStandardMaterial
          map={cloudTexture}
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </Sphere>

      {/* Blue atmospheric glow */}
      <Sphere args={[2.12, 64, 64]}>
        <meshBasicMaterial
          color="#5da7ff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </Sphere>

      <Sphere args={[2.2, 64, 64]}>
        <meshBasicMaterial
          color="#78adff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>
    </>
  );
}

function ShippingRoutes() {
  const locations = [
    { name: "Nhava Sheva", lat: 18.95, lon: 72.95, flag: "🇮🇳" },
    { name: "Chennai", lat: 13.08, lon: 80.27, flag: "🇮🇳" },
    { name: "Hyderabad", lat: 17.38, lon: 78.48, flag: "🇮🇳" },
    { name: "Yiwu", lat: 29.31, lon: 120.07, flag: "🇨🇳" },
    { name: "Guangzhou", lat: 23.13, lon: 113.26, flag: "🇨🇳" },
    { name: "Shanghai", lat: 31.23, lon: 121.47, flag: "🇨🇳" },
  ];

  const routes = [
    [0, 5],
    [1, 4],
    [2, 3],
  ];

  const routeCurves = useMemo(() => {
    return routes.map(([start, end]) => {
      const startPoint = latLonToVector(
        locations[start].lat,
        locations[start].lon,
        2.025
      );

      const endPoint = latLonToVector(
        locations[end].lat,
        locations[end].lon,
        2.025
      );

      const middle = startPoint.clone().add(endPoint).multiplyScalar(0.5);
      middle.normalize().multiplyScalar(2.35);

      return new THREE.QuadraticBezierCurve3(
        startPoint,
        middle,
        endPoint
      );
    });
  }, []);

  return (
    <>
      {/* Red shipping route lines */}
      {routeCurves.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 60, 0.009, 8, false]} />
          <meshBasicMaterial
            color="#ed2923"
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}

      {/* Location points and labels */}
      {locations.map((location, index) => {
        const position = latLonToVector(
          location.lat,
          location.lon,
          2.04
        );

        return (
          <group key={location.name} position={position}>
            <mesh>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            <mesh>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial
                color={index >= 3 ? "#ef2924" : "#ffffff"}
                transparent
                opacity={0.3}
              />
            </mesh>

            <Html distanceFactor={8} position={[0.08, 0.05, 0]}>
              <div className="globe-location-label">
                <span>{location.flag}</span>
                <span>{location.name}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={1.1} />

      <directionalLight
        position={[5, 3, 5]}
        intensity={2.3}
      />

      <directionalLight
        position={[-4, -2, -5]}
        intensity={0.4}
      />

      <Earth />
      <ShippingRoutes />
    </>
  );
}

export default function Globe() {
  return (
    <div className="globe-container">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 38 }}
        dpr={[1, 1.5]}
      >
        <GlobeScene />
      </Canvas>
    </div>
  );
}