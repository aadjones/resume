import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Autofill!   
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Push the button. Conform to expectations. Or simulate it convincingly.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/wizard/industry"
              className="rounded-md bg-[#FF6B3D] px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-[#FF5A2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B3D]"
            >
              Create My Resume Now
            </Link>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-32">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Review Card 1 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-[#FF6B3D]"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sarah J.</h3>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <p className="mt-6 text-gray-600">
                "What did I just see?"
              </p>
              <div className="mt-4 flex text-[#FF6B3D] text-xl">
                ★☆☆☆☆
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-[#FF6B3D]"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Michael R.</h3>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
              <p className="mt-6 text-gray-600">
                "Thanks to this tool, I can lie with dignity."
              </p>
              <div className="mt-4 flex text-[#FF6B3D] text-xl">
                ★★★★★
              </div>
            </div>

            {/* Review Card 3 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-[#FF6B3D]"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Chat G.</h3>
                  <p className="text-sm text-gray-500">Not A Robot</p>
                </div>
              </div>
              <p className="mt-6 text-gray-600">
                "I used to spend hours pretending to be confident. Now I just press a button."
              </p>
              <div className="mt-4 flex text-[#FF6B3D] text-xl">
                ★★★★☆
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
