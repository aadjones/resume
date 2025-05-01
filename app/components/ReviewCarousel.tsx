'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

type Review = {
  name: string;
  title: string;
  quote: string;
  rating: number;
};

const reviews: Review[] = [
  {
    name: 'Sarah J.',
    title: 'Software Engineer',
    quote: 'What did I just see?',
    rating: 1,
  },
  {
    name: 'Michael R.',
    title: 'Marketing Manager',
    quote: 'Thanks to this tool, I can lie with dignity.',
    rating: 5,
  },
  {
    name: 'Chat G.',
    title: 'Not A Robot',
    quote: 'I used to spend hours pretending to be confident. Now I just press a button.',
    rating: 4,
  },
];

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="rounded-2xl bg-white p-4 sm:p-8 shadow-lg ring-1 ring-gray-200 h-full flex flex-col justify-between">
    <div>
      <div className="flex gap-3 sm:gap-4">
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#FF6B3D] flex-shrink-0"></div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{review.name}</h3>
          <p className="text-xs sm:text-sm text-gray-500">{review.title}</p>
        </div>
      </div>
      <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
        &ldquo;{review.quote}&rdquo;
      </p>
    </div>
    <div className="mt-3 sm:mt-4 flex text-[#FF6B3D] text-lg sm:text-xl">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < review.rating ? '★' : '☆'}</span>
      ))}
    </div>
  </div>
);

export default function ReviewCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      {/* Mobile/Tablet Carousel */}
      <div className="lg:hidden relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] pl-4 h-full"
              >
                <div className="mr-4 h-full">
                  <ReviewCard review={review} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900 focus:outline-none text-sm sm:text-base"
          onClick={scrollPrev}
        >
          ←
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900 focus:outline-none text-sm sm:text-base"
          onClick={scrollNext}
        >
          →
        </button>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-8 px-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </>
  );
} 