import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <main className="start-screen">
      <div className="flex flex-col items-center justify-center h-screen font-tahoma">
          <h1 className="text-5xl font-bold text-white mb-8" style={{ fontFamily: 'Tahoma, sans-serif', color: 'yellow' }}>
            REEF EXPEDITION
          </h1>
          <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Tahoma, sans-serif', color: 'yellow' }}>
            A Marine Biologist's Journey
          </h2>
          <div className="translucent-box p-8 mb-4 text-lg text-white text-center">
            <p className="instructions">
              You are a Marine Biologist on a mission to catalog the amazing biodiversity of the Great Barrier Reef. 
              Dive into this vibrant underwater world, where every coral garden and school of fish holds new discoveries waiting to be classified. 
              Unravel the mysteries of this incredible ecosystem one creature at a time. The reef's future rests in your hands as you race to preserve its wonders.
              Are you ready to become the ultimate custodian of the sea? Grab your dive gear - it's time to explore!
            </p>
          </div>
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link href="/artcritic">Art Critic Demo </Link>
        <div className="button-container w-full flex justify-center">
          <Link href="/reef" passHref>
            <button className="reef-button text-center px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
              Start Game
            </button>
          </Link>
        </div>
          </div>
        </div>
        <audio autoPlay loop>
        <source src="/path/to/your/background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </main>
  );
}
