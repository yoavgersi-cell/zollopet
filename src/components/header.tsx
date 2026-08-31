"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useNavPrefix, navHref } from "@/lib/nav-prefix";
import { DEFAULT_VERTICAL } from "@/lib/config";
import { HubLogo } from "@/components/hub-logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const prefix = useNavPrefix();
  const vertical = prefix.replace(/^\//, "");

  // Navigation resolves within the current category (fresh dog food, etc.).
  // When no vertical prefix resolves (hub home, rewritten shared pages), fall
  // back to the default vertical so the links always land on real content.
  const fallback = `/${DEFAULT_VERTICAL}`;
  const nav = [
    { label: "Reviews", href: navHref(prefix || fallback, "/reviews") },
    { label: "Comparisons", href: `${navHref(prefix || fallback, "/articles")}#comparisons` },
    { label: "Guides", href: navHref(prefix || fallback, "/articles") },
  ];

  return (
    <header className="border-b-2 border-[#E4D9C2] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={navHref(prefix, "/")} className="flex items-center">
          <HubLogo vertical={vertical} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-7 text-[14px] font-medium text-[#22362A]">
          {nav.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-[#1F4A33] transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-[#22362A]"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" strokeWidth={1.5} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="sm:hidden border-t border-[#E5E5E5] bg-white px-4 py-3 space-y-3">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-[15px] font-medium text-[#22362A] hover:text-[#1F4A33]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
