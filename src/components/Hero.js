// import Button from "@/components/Button";

export default function Hero() {
  return (
    <section
      className="tw-relative tw-min-h-[600px] tw-h-screen tw-text-center tw-bg-cover tw-bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('/hero-img.jpg')",
      }}
    >
      <div
        className="tw-z-10 tw-px-6 sm:tw-px-8 lg:tw-px-12 tw-relative tw-top-36"
        data-aos="zoom-in"
      >
        <h1 className="tw-text-white tw-text-4xl sm:tw-text-5xl md:tw-text-6xl lg:tw-text-7xl tw-font-bold tw-mb-6">
          Explore the World With Us
        </h1>
        <p className="tw-text-white tw-text-base sm:tw-text-lg md:tw-text-xl lg:tw-text-2xl tw-mb-10">
          Find your best experience in various destinations
        </p>
        {/* <Button
          title="Start Adventure"
          style="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-3 tw-px-6"
        /> */}
      </div>
    </section>
  );
}
