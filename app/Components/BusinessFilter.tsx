"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function BusinessFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedService = searchParams.get("service") || "";

  function handleChange  (e: any)  {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("service", value);
    } else {
      params.delete("service");
    }

    router.push("?" + params.toString());
  };

  return (
    <div className="filter-container">
        <h3 className="filter-header">Filters:</h3>

        <div className="filter-wrapper">
            <select
                name="service"
                value={selectedService}
                onChange={handleChange}
                className="service-dropdown"
            >
                <option value="">All Services</option>
                <option value="2">Tiffin Service</option>
                <option value="3">Dry Snacks</option>
                <option value="4">Home Bakery</option>
                <option value="5">Home Cook</option>
            </select>
        </div>
    </div>
  );
}