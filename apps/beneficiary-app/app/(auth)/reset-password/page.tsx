// apps/beneficiary-app/app/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import { Input, Button } from "@carerail/ui";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const msg = await res.text();
      setError(msg);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white shadow-md p-6 rounded-xl">
        <h1 className="text-xl font-semibold mb-4">Create Account</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?
          <a href="/signin" className="text-blue-600 ml-1">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}