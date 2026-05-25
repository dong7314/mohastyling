'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (id: string, password: string) => {
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    });

    if (res.ok) {
      sessionStorage.setItem('adminAuth', 'true');
      sessionStorage.setItem('adminCredentials', btoa(`${id}:${password}`));
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
