"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { isTokenExists,logout } from "../Utils/Functions";
export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside className="sidebar">
        <ul className="">
            <li>
              <Link href="/"  className={pathname === "/" ? "active" : ""}>Home</Link>
            </li>
            {!isTokenExists() &&
              <li>
                <Link href="/login" className={"btn btn-logout" + (pathname === "/login" ? " active" : "") }>Login</Link>
              </li>
            }
            {isTokenExists() &&
              <>
                <li>
                  <Link href="/business" className={pathname === "/business" ? "active" : ""}>Businesses</Link>
                </li>
                <li>
                  <Link href="/profile" className={pathname === "/profile" ? "active" : ""}>Profile</Link>
                </li>
                <li>
                  <button className="btn btn-logout" onClick={() =>
                    { 
                      logout();
                      router.push("/login");
                  }}>Logout</button>
                </li>
              </>
            }
        </ul>
    </aside>
  );
}