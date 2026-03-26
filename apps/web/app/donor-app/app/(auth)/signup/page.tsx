"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@carerail/ui/components";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !name) return toast.error("Please enter all fields");
    setLoading(true);
    try {
      const res = await fetch("/api/donor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Account created successfully!");
        router.push("/dashboard");
      } else {
        toast.error(data.error || "Sign up failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleSignUp} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </div>
      </div>
    </div>
  );
}