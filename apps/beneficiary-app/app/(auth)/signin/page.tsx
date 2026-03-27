// apps/beneficiary-app/app/(auth)/signin/page.tsx
"use client";

import { useState } from "react";
import { Input, Button } from "@carerail/ui";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role: "beneficiary" }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white shadow-md p-6 rounded-xl">
        <h1 className="text-xl font-semibold mb-4">Sign In</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Phone"
            type="tel"
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
            Sign In
          </Button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?
          <a href="/signup" className="text-blue-600 ml-1">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}