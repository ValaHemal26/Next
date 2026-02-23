import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getBusinesses } from "../api/api";


export default async function MealPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await getBusinesses(token);
  const businesses = response?.data?.businesses || [];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
        
      <h1 className="text-3xl font-bold text-center mb-10">
        Businesses
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        
        {businesses.map((business: any) => (
          <Link
            key={business.id}
            href={`/meal/${business.id}`}
            className="group"
          >
            <div className="bg-white rounded-xl shadow-md  overflow-hidden border border-gray-200 ">

              {business.logo?.url && (
                <img
                  src={business.logo.url}
                  alt={business.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="!p-5">
                <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition">
                  {business.name}
                </h2>

                <p className="text-sm text-gray-500 mb-1">
                  {business.address_1?.city}, {business.address_1?.state}
                </p>

                <p className="text-sm text-gray-600 mb-3">
                  {business.services?.title}
                </p>

                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    business.is_business_open
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {business.is_business_open ? "Open" : "Closed"}
                </span>
              </div>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}