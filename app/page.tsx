import Link from "next/link";
import ReviewCarousel from "./components/ReviewCarousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Autofill!
          </h1>

          <p className="mt-4 sm:mt-6 text-base md:text-lg leading-7 sm:leading-8 text-gray-600 max-w-2xl mx-auto">
            Push the button. Conform to expectations. Or simulate it
            convincingly.
          </p>

          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/wizard/industry"
              className="rounded-md bg-[#FF6B3D] px-6 sm:px-8 py-3 sm:py-4 text-base md:text-lg font-semibold text-white shadow-sm hover:bg-[#FF5A2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B3D]"
            >
              Create My Resume Now
            </Link>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-20 sm:mt-32">
          <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-8 sm:mb-12">
            What Our Users Say
          </h2>
          <ReviewCarousel />
        </div>
      </div>
    </main>
  );
}
