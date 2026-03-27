"use client";

import { useState } from "react";
import { api } from "../../../lib/api";

export default function SettingsPage() {
  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");

  const saveSettings = async () => {
    await api.vendor.updateProfile({ shopName, phone });
    alert("Settings updated!");
  };

  return (
    <div className="p-6 max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Shop Name</label>
        <input
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />
      </div>

      <button
        onClick={saveSettings}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
}