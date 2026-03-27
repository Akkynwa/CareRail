import { redirect } from "next/navigation";
import "./globals.css"; // Must be here!

export default function AdminHome() {
  redirect("/dashboard");
}
