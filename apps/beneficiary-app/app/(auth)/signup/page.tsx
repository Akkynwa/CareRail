// apps/beneficiary-app/app/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import { Input, Button } from "@carerail/ui";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:4000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role: "beneficiary" }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Signup failed");
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
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />

          <Input
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
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