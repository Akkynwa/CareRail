'use client';
import { Button, Input } from '@carerail/ui';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // NextAuth logic here
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Welcome to CareRail</h1>
        <div className="space-y-4">
          <Input label="Email Address" type="email" placeholder="name@company.com" required />
          <Input label="Password" type="password" placeholder="••••••••" required />
          <Button type="submit" className="w-full" isLoading={loading}>
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}