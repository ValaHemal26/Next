import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {BusinessFilters} from "../Components/BusinessFilter";
import { getBusinesses,getServices } from "../api/api";


export default async function BusinessList({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const { service } = await searchParams;
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  
  if (!token) {
    redirect("/login");
  }
  const serviceList = await getServices(token);
  const response = await getBusinesses(token,service);
  if (!response.success) {
    return <div>{response.message}</div>;
  }
  
  const businesses = response?.data?.data?.businesses;

  return (
    
    <div className="business-container">

      <h1 className="business-list-header">Business List</h1>
      <BusinessFilters services={serviceList}/>

      <div className="business-grid">
        
        { businesses?.length === 0 

            ? "No Business found" :
            
          businesses.map((business: any) => (
          <Link key={business.id} href={"/business/" + business.id}>
            <div className="business-card">
              {business.logo?.url && (
                <div className="imageWrapper">
                  <img
                    src={business.logo.url}
                    alt={business.name}
                    className="image"
                  />
                </div>
              )}

              <div className="cardContent">
                <h2 className="title">{business.name}</h2>

                <p className="location">
                  {business.address_1?.city}, {business.address_1?.state}
                </p>

                <p className="service">
                  {business.services?.title}
                </p>

                <span
                  className={
                    business.is_business_open
                      ? "openBadge"
                      : "closedBadge"
                  }
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