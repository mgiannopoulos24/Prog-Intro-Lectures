import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import ToggleSwitch from "@/components/theme/ToggleSwitch"; // Import the ToggleSwitch

const NewNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { href: "/Quizzes", text: "Quizzes" },
    { href: "/CodeChallenges", text: "Code Challenges" },
    { href: "/Labs", text: "Labs" },
    { href: "/Uoabot", text: "Uoabot" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Website Brand */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-xl font-bold text-slate-900 dark:text-slate-50"
            >
              Prog Intro Lectures
            </a>
          </div>

          {/* Right side of the Navbar (Desktop Links, Switch, Mobile Button) */}
          <div className="flex items-center">
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {link.text}
                </a>
              ))}
            </div>

            {/* Desktop Theme Switch (hidden on mobile) */}
            <div className="hidden lg:block ml-6">
              <ToggleSwitch />
            </div>

            {/* Mobile Menu Button (hidden on desktop) */}
            <div className="lg:hidden ml-4">
              <button
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open main menu"
                className="rounded-md p-2 text-slate-600 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Drawer Menu --- */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-[275px] transform bg-slate-100 shadow-xl transition-transform duration-300 ease-in-out dark:bg-gray-800 lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-5">
          {/* Drawer Header with Switch on the left and Close button on the right */}
          <div className="mb-4 flex items-center justify-between">
            <ToggleSwitch />
            <button
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close main menu"
              className="rounded-md p-2 text-slate-600 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-slate-300 py-4 text-center text-lg font-medium text-slate-800 transition-colors hover:bg-slate-200 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default NewNavbar;
