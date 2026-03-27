export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">CareRail</div>
          <div className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
            <a href="#apps" className="text-gray-600 hover:text-indigo-600">Applications</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transparent Charitable Giving
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect donors with beneficiaries through secure, transparent digital vouchers. 
            Track impact in real-time with blockchain-powered accountability.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="http://localhost:3003"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Beneficiary Portal
            </a>
            <a
              href="http://localhost:3004"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Donor Platform
            </a>
            <a
              href="http://localhost:3000"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Admin Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-4">Donors Create Donations</h3>
              <p className="text-gray-600">
                Donors fund specific causes and receive digital vouchers with QR codes 
                to distribute to beneficiaries.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold mb-4">Beneficiaries Receive Vouchers</h3>
              <p className="text-gray-600">
                Beneficiaries receive secure vouchers either through QR codes or 
                manage them in their personal wallet.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-bold mb-4">Vendors Process Redemptions</h3>
              <p className="text-gray-600">
                Vendors scan QR codes at point-of-sale to process redemptions instantly 
                with transaction tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section id="apps" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Applications
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Beneficiary App */}
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-green-600">
              <h3 className="text-2xl font-bold text-green-600 mb-4">Beneficiary App</h3>
              <p className="text-gray-600 mb-6">
                Manage your wallet, view received vouchers, and redeem them at partnered vendors.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>✓ Digital Wallet</li>
                <li>✓ Voucher Management</li>
                <li>✓ Transaction History</li>
                <li>✓ QR Code Scanner</li>
              </ul>
              <a
                href="http://localhost:3003"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Launch App →
              </a>
            </div>

            {/* Donor App */}
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Donor Platform</h3>
              <p className="text-gray-600 mb-6">
                Create donations, distribute vouchers, and track impact in real-time.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>✓ Create Donations</li>
                <li>✓ Generate QR Codes</li>
                <li>✓ Live Impact Feed</li>
                <li>✓ Analytics Dashboard</li>
              </ul>
              <a
                href="http://localhost:3004"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Launch App →
              </a>
            </div>

            {/* Admin Dashboard */}
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-purple-600">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Admin Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Manage system operations and monitor the health of the entire platform.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>✓ User Management</li>
                <li>✓ System Monitoring</li>
                <li>✓ Reports & Analytics</li>
                <li>✓ Configuration</li>
              </ul>
              <a
                href="http://localhost:3000"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Launch App →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <p>Active Beneficiaries</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <p>Verified Donors</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">12+</div>
              <p>Partner Vendors</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₦500K+</div>
              <p>Funds Distributed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 CareRail. Transparent Giving for Better Impact.</p>
        </div>
      </footer>
    </div>
  );
}