'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { updateMyPassword } from '@/api/auth-api';

// Define validation schema with Zod
const passwordSchema = z.object({
  password: z.string().min(1, { message: 'Vui lòng nhập mật khẩu hiện tại' }),
  newPassword: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  confirmPassword: z.string().min(1, { message: 'Vui lòng xác nhận mật khẩu mới' })
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword']
});

// Create type from schema
type PasswordFormData = z.infer<typeof passwordSchema>;

interface PasswordChangeFormProps {
  isChanging: boolean;
  onChangeComplete: () => void;
}

export default function PasswordChangeForm({ isChanging, onChangeComplete }: PasswordChangeFormProps) {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: updateMyPassword,
    onSuccess: () => {
      onChangeComplete()
      toast({
        title: "Cập nhật thành công",
        description: "Mật khẩu của bạn đã được thay đổi",
      });
    },
    onError: () => { 
      toast({
        title: "Cập nhật thất bại",
        description: "Mật khẩu không đúng.",
        variant: "destructive",
      });
    }
  })
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onPasswordSubmit = (data: PasswordFormData) => {
    mutate({
      newPassword: data.newPassword,
      currentPassword: data.password
    }); 
  };

  if (isChanging) {
    return (
      <form onSubmit={handleSubmit(onPasswordSubmit)}>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-1">Mật khẩu hiện tại</label>
            <input
              type="password"
              className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-primary`}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Mật khẩu mới</label>
            <input
              type="password"
              className={`w-full p-3 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-primary`}
              {...register('newPassword')}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-primary`}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-3"
            onClick={onChangeComplete}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            disabled={isPending}
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </form>
    );
  }
  
  return (
    <div>
      <p className="text-gray-600">Mật khẩu của bạn được mã hóa và bảo mật. Vui lòng không chia sẻ thông tin đăng nhập cho bất kỳ ai.</p>
      <p className="text-gray-600 mt-2">Bạn nên thay đổi mật khẩu định kỳ để đảm bảo an toàn cho tài khoản.</p>
    </div>
  );
}