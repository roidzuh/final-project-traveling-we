// import Button from "@/components/Button";

export default function Hero() {
  return (
    <div
      className="relative min-h-[600px] h-screen text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('/hero-img.jpg')",
      }}
    >
      <div className="z-10 px-6 sm:px-8 lg:px-12 relative top-36">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          Explore the World With Us
        </h1>
        <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-10">
          Find your best experience in various destinations
        </p>
        {/* <Button
          title="Start Adventure"
          style="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6"
        /> */}
      </div>
    </div>
  );
}
