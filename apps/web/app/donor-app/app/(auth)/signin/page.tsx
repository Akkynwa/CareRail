"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@carerail/ui/components";
import toast from "react-hot-toast";
import { useDonor } from "../../context/DonorContext";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
const { setDonor } = useDonor();


  const handleSignIn = async () => {
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    try {
      const res = await fetch("/api/donor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Signed in successfully!");
        router.push("/dashboard");
      } else {
        toast.error(data.error || "Sign in failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }


if (res.ok) {
  const donorData = await res.json();
  setDonor(donorData); // store donor globally
  toast.success("Signed in successfully!");
  router.push("/dashboard");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleSignIn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
}