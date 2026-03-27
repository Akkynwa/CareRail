export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      <p className="mt-4 text-gray-600">Welcome to the CareRail admin panel</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Donors</h3>
          <p className="text-2xl font-bold text-blue-600">25</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Beneficiaries</h3>
          <p className="text-2xl font-bold text-green-600">150</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Vendors</h3>
          <p className="text-2xl font-bold text-purple-600">12</p>
        </div>
      </div>
    </div>
  );
}
