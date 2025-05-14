import { comments } from "@/constants/comments";

const Testimonials = () => {
  // Get a subset of comments to use as testimonials
  const testimonials = comments
    .filter((comment) => comment.rating >= 4)
    .slice(0, 3);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h2 className="mb-2 font-montserrat text-2xl font-bold text-gray-800">
          Khách hàng nói gì về chúng tôi
        </h2>
        <p className="mx-auto max-w-2xl text-gray-600">
          Chúng tôi luôn lắng nghe và cải thiện dịch vụ dựa trên phản hồi của
          khách hàng để mang đến trải nghiệm tốt nhất.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="absolute -top-4 left-6 text-5xl text-primary opacity-20">
              "
            </div>
            <div className="relative">
              <p className="mb-6 italic text-gray-600">{testimonial.content}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.userAvatar}
                  alt={testimonial.userName}
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.userName}</h4>
                  <div className="mt-1 flex items-center text-sm text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bx ${i < testimonial.rating ? "bxs-star" : "bx-star"}`}
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
