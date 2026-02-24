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
 if (!data.success) {
    return <div>{data.message}</div>;
  } 
  
  const business = data?.data?.data;

return (

    <div className="business">

      <div className="business__cover">
        {business?.cover_photo?.url && (
          <img
            src={business.cover_photo.url}
            alt={business?.name}
            className="business__cover-img"
          />
        )}
        <div className="business__cover-overlay" />
      </div>

      <div className="business__wrapper">

        <div className="business__card">

          <div className="business__top">

            <div className="business__info">
              {business?.logo?.url && (
                <img
                  src={business.logo.url}
                  alt="Logo"
                  className="business__logo"
                />
              )}

              <div>
                <h1 className="business__title">{business?.name}</h1>
                <p className="business__service">
                  {business?.services?.title}
                </p>
              </div>
            </div>

            <div className="business__status-box">
              <span
                className={
                  business?.is_business_open
                    ? "status status--open"
                    : "status status--closed"
                }
              >
                {business?.is_business_open
                  ? "Open Now"
                  : "Currently Closed"}
              </span>
              <p>Free Delivery: {business?.free_delivery_limit} Km</p>
              <p>Extra Charges: ₹{business?.extra_delivery_charges}</p>
            </div>
          </div>

          <hr />

          <div className="business__details">
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

        <div className="meals">
          <h2 className="meals__title">Available Meals</h2>

          <div className="meals__grid">
            {business?.services?.meals?.map((meal: any) => (
              <div key={meal.id} className="meal">
                <div className="meal__header">
                  <h3>{meal.title}</h3>
                  <span className="meal__type">
                    {meal.meal_type?.name}
                  </span>
                </div>

                <p className="meal__time">
                  {meal.available_from} - {meal.available_to}
                </p>

                <div className="meal__items">
                  {meal.items?.map((item: any) => (
                    <div key={item.id} className="meal__item">
                      <span>
                        {item.title} {item.quantity && " (" + item.quantity + ")"}
                      </span>
                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* <button className="btn-primary">
                  Book Meal
                </button> */}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
        
  
);
}