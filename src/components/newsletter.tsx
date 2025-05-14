import React, { useState } from "react";

import { useToast } from "@/hooks/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập địa chỉ email của bạn.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Đăng ký thành công!",
        description: "Cảm ơn bạn đã đăng ký nhận thông tin từ SeedBloom.",
      });

      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-primary py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <h2 className="mb-2 font-montserrat text-2xl font-bold text-white">
              Đăng ký nhận thông tin
            </h2>
            <p className="text-white/90">
              Nhận thông tin về sản phẩm mới và khuyến mãi hấp dẫn
            </p>
          </div>
          <div className="w-full md:w-auto">
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Email của bạn"
                className="min-w-0 flex-1 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center whitespace-nowrap rounded-full bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <React.Fragment>
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Đang xử lý...
                  </React.Fragment>
                ) : (
                  "Đăng ký ngay"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
