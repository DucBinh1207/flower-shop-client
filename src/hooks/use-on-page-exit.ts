
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useOnPageExit(callback: () => void) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter(); // useRouter() vẫn gọi bình thường, nhưng ta sẽ kiểm tra khi mounted

  useEffect(() => {
    // Chỉ gọi useRouter và các hook khác sau khi component đã mounted
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return; // Đảm bảo code chỉ chạy ở client

    const handleRouteChange = () => {
      callback();
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "Bạn có chắc chắn muốn rời khỏi trang?";
      callback();
    };

    // Lắng nghe sự kiện khi route thay đổi
    router.events.on('routeChangeStart', handleRouteChange);

    // Lắng nghe sự kiện khi người dùng muốn đóng trang
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [callback, isMounted, router.events]);

  return null; 
}
