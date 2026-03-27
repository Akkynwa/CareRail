"use client";
import { useState } from "react";
import { Input, Button } from "@carerail/ui";

export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false);

  const submit = (e: any) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <form
        onSubmit={submit}
        className="bg-white shadow-md w-full max-w-md rounded-xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold">Reset Password</h1>

        {!sent ? (
          <>
            <Input label="Email" name="email" type="email" required />
            <Button className="w-full" type="submit">
              Send Reset Link
            </Button>
          </>
        ) : (
          <p className="text-green-600 text-center">
            A reset link has been sent to your email
          </p>
        )}
      </form>
    </div>
  );
}