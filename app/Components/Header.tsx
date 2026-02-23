"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isTokenExists,logout } from "../Utils/Functions";
export default function Header() {
    const pathname = usePathname();

  return (
    <header className="header">
      <h1>Tiffin Service</h1>

      <nav>
        <ul className="nav-links">
          <li>
            <Link href="/"  className={pathname === "/" ? "active" : ""}>Home</Link>
          </li>
          {!isTokenExists() &&
            <li>
              <Link href="/login" className={pathname === "/login" ? "active" : ""}>Login</Link>
            </li>
          }
          {isTokenExists() &&
            <>
              <li>
                <Link href="/meal" className={pathname === "/meal" ? "active" : ""}>Meals</Link>
              </li>
              <li>
                <button className="btn-logout" onClick={() => logout()}>Logout</button>
              </li>
            </>
          }
        </ul>
      </nav>
    </header>
  );
}