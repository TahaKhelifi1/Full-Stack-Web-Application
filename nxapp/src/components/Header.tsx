import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-indigo-600 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <Link href="/products" className="text-white font-extrabold text-xl tracking-tight hover:opacity-80 transition-opacity">
          nxapp
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/products" className="text-indigo-100 text-sm font-medium hover:text-white transition-colors">
            Products
          </Link>
          <Link href="/admin" className="text-indigo-100 text-sm font-medium hover:text-white transition-colors">
            Admin
          </Link>
          <Link href="/login" className="text-indigo-100 text-sm font-medium hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/contact" className="text-indigo-100 text-sm font-medium hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/about" className="text-indigo-100 text-sm font-medium hover:text-white transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}