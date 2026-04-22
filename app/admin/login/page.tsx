'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (id: string, password: string) => {
    // Simple client-side check - in production, use server-side auth
    const adminId = process.env.NEXT_PUBLIC_ADMIN_ID || 'admin';
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin1234';

    if (id === adminId && password === adminPassword) {
      // Store auth in sessionStorage (in production, use secure cookies)
      sessionStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-6">
      <LoginForm onLogin={handleLogin} error={error} />
    </div>
  );
}
