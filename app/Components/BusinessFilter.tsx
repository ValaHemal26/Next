"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function BusinessFilters({services}) {
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
                {
                  services.data.data.map(s =>
                    <option key={s.id} value={s.id}>{s.name}</option>
                  )
                }
            </select>
        </div>
    </div>
  );
}