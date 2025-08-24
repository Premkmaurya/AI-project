import React from "react";
import Particle from "../components/Particle";
import Nav from "../components/Nav";


function Home() {
  return (
    <div className="bg-black overflow-x-hidden w-screen h-screen">
      <Nav />
        
      <Particle
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={500}
        particleSpread={8}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        particleHoverFactor={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
}

export default Home;
