import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSingleBusiness } from "../../api/api";
import "../../assets/css/style.css";

export default async function SingleBusinessPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { id } = await params;

  if (!token) {
    redirect("/login");
  }

  const data = await getSingleBusiness(id, token);
  const business = data?.data;

  return (
    <div className="business-page">

      {/* Cover */}
      <div className="business-cover">
        {business?.cover_photo?.url && (
          <img
            src={business.cover_photo.url}
            alt={business?.name}
            className="cover-img"
          />
        )}
        <div className="overlay" />
      </div>

      <div className="business-container">

        {/* Business Info Card */}
        <div className="business-card">

          <div className="business-header">

            <div className="logo-section">
              {business?.logo?.url && (
                <img
                  src={business.logo.url}
                  alt="Logo"
                  className="logo-img"
                />
              )}

              <div>
                <h1>{business?.name}</h1>
                <p className="service-title">
                  {business?.services?.title}
                </p>
              </div>
            </div>

            <div className="status-section">
              <span
                className={
                  business?.is_business_open
                    ? "status open"
                    : "status closed"
                }
              >
                {business?.is_business_open
                  ? "Open Now"
                  : "Currently Closed"}
              </span>
              <p>Free Delivery: {business?.free_delivery_limit}</p>
              <p>Extra Charges: ₹{business?.extra_delivery_charges}</p>
            </div>
          </div>

          <div className="divider" />

          <div className="business-details">
            <div>
              <h3>Address</h3>
              <p>{business?.address_1?.location_address}</p>
              <p>
                {business?.address_1?.city},{" "}
                {business?.address_1?.state} -{" "}
                {business?.address_1?.pincode}
              </p>
              <p>
                Service Areas: {business?.service_areas?.join(", ")}
              </p>
            </div>

            <div>
              <h3>Contact</h3>
              <p>
                {business?.owner_detail?.firstName}{" "}
                {business?.owner_detail?.lastName}
              </p>
              <p>{business?.owner_detail?.contact_number}</p>
              <p>{business?.owner_detail?.email}</p>
              <p>
                Working Days: {business?.working_days?.join(", ")}
              </p>
            </div>
          </div>
        </div>

        {/* Meals Section */}
        <div className="meals-section">
          <h2>Available Meals</h2>

          <div className="meal-grid">
            {business?.services?.meals?.map((meal: any) => (
              <div key={meal.id} className="meal-card">
                <div className="meal-header">
                  <h3>{meal.title}</h3>
                  <span>{meal.meal_type?.name}</span>
                </div>

                <p className="meal-time">
                  {meal.available_from} - {meal.available_to}
                </p>

                <div className="meal-items">
                  {meal.items?.map((item: any) => (
                    <div key={item.id} className="meal-item">
                      <span>
                        {item.title} {item.quantity && `(${item.quantity})`}
                      </span>
                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </div>

                <button className="book-btn">
                  Book Meal
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}