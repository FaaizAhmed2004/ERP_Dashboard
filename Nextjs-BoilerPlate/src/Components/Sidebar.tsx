import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed flex flex-col">
      {/* Logo */}
      <div className="p-4 text-center font-bold text-lg bg-gray-900">My App</div>
      {/* Navigation Links */}
      <nav className="flex-grow p-4">
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/profile" className="block px-4 py-2 rounded hover:bg-gray-700">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/settings" className="block px-4 py-2 rounded hover:bg-gray-700">
              Settings
            </Link>
          </li>
          <li>
            <Link href="/logout" className="block px-4 py-2 rounded hover:bg-gray-700">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      {/* Footer */}
      <div className="p-4 text-center text-sm text-gray-400">
        © 2024 My App. All Rights Reserved.
      </div>
    </div>
  );
};

export default Sidebar;
