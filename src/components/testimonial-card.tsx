interface TestimonialCardProps {
  testimonial: {
    content: string;
    name: string;
    avatar: string;
    rating: number;
  };
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="absolute -top-4 left-6 text-5xl text-primary opacity-20">
        "
      </div>
      <div className="relative">
        <p className="mb-6 italic text-gray-600">{testimonial.content}</p>
        <div className="flex items-center">
            <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
