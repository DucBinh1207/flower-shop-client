'use client'

import { useState } from 'react';
import ProfileInfoForm from './profile-change-form';
import PasswordChangeForm from './password-change-form';

export default function Profile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Thông tin tài khoản</h1>
          
          {/* Profile Information Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Thông tin cá nhân
                </h2>
                <button 
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="text-primary hover:text-primary-dark"
                >
                  {isEditingProfile ? 'Hủy' : 'Chỉnh sửa'}
                </button>
              </div>
              
              <ProfileInfoForm 
                isEditing={isEditingProfile} 
                onEditComplete={() => setIsEditingProfile(false)} 
              />
            </div>
          </div>
          
          {/* Password Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Bảo mật
                </h2>
                <button 
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                  className="text-primary hover:text-primary-dark"
                >
                  {isChangingPassword ? 'Hủy' : 'Đổi mật khẩu'}
                </button>
              </div>
              
              <PasswordChangeForm 
                isChanging={isChangingPassword} 
                onChangeComplete={() => setIsChangingPassword(false)} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}