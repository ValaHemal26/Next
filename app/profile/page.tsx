import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateProfile } from "../api/api";
import {ProfileForm} from "./ProfileForm";
import "../assets/css/style.css";


export default async function ProfilePage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userCookie = cookieStore.get("user")?.value;

  if (!token || !userCookie) {
    redirect("/login");
  }

  const user = JSON.parse(userCookie);
  const { isEditMode,messageType,message } = await searchParams;
 
  async function handleUpdate(prevState: any, formData: FormData) {
    "use server";

    const token = (await cookies()).get("token")?.value;
    if (!token) redirect("/login");

    const body = {
        name: formData.get("name"),
        email: formData.get("email"),
        number: formData.get("number"),
        secondary_number: formData.get("secondary_number"),
    };
    
    const errors = {};

    if (body.name !== "" && body.name.length < 3) {
        errors.name = "Name must be at least 3 characters long";
    }

    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
        errors.email = "Enter a valid email address";
    }

    if (body.number && !/^[0-9]{10}$/.test(body.number)) {
        errors.number = "Enter valid 10 digit primary number";
    }

    if (body.secondary_number !== "" && !/^[0-9]{10}$/.test(body.secondary_number)) {
        errors.secondary_number = "Enter valid 10 digit secondary number";
    }

    if (Object.keys(errors).length > 0) {
        return {
        success: false,
        message:errors,
        values: body, 
        };
    }

    const res = await updateProfile(body, token);
    
    if (!res.success) {
        return {
        success: false,
        message: res.message,
        values: body,
        };
    }

    const updatedUser = res.data.data;
    (await cookies()).set("user", JSON.stringify(updatedUser));

    redirect("/profile?messageType=success&message=Profile updated successfully");
  }
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
       
        {!isEditMode ? (
          <>
            <div className="profile-info">
              {user.firstName && <p><strong>First Name:</strong> {user.firstName}</p>}
              {user.lastName && <p><strong>Last Name:</strong> {user.lastName}</p>}
              {user.email && <p><strong>Email:</strong> {user.email}</p>}
              {user.contact_number && <p><strong>Primary Number:</strong> {user.contact_number}</p>}
              {user.secondary_number && <p><strong>Secondary Number:</strong> {user.secondary_number}</p>}
            </div>

            <a href="/profile?isEditMode=true" className="edit-btn">
              Edit Profile
            </a>
            {message && message !== "" && (
             <div className={"msg " + messageType}>{message}</div>
            )}

          </>
        ) : (
        
         <ProfileForm user={user} action={handleUpdate} />
        )}
      </div>
    </div>
  );
}