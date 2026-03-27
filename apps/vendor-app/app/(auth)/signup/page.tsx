"use client";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";
import { useState } from "react";
import { Input, Button, ErrorText } from "@carerail/ui";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    const f = new FormData(e.target);

    const res = await api.auth.signup({
      name: f.get("name") as string,
      email: f.get("email") as string,
      password: f.get("password") as string,
    });

    if (!res.success) return setError(res.message);
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <form
        onSubmit={submit}
        className="bg-white shadow-md w-full max-w-md rounded-xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold">Create Vendor Account</h1>

        {error && <ErrorText>{error}</ErrorText>}

        <Input label="Vendor Name" name="name" required />
        <Input label="Email" name="email" type="email" required />
        <Input label="Password" name="password" type="password" required />

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </div>
  );
}