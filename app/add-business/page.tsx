import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { addBusiness, deleteBusiness, getMyBusinesses, getServices } from "../api/api";
import { AddBusinessForm } from "./AddBusinessForm";
import "../assets/css/style.css";
import {MyBusinessList} from "./MyBusinessList";
import { revalidatePath } from "next/cache";

export default async function AddBusinessPage() {
  const cookieStore = await cookies();
  
  const token =  cookieStore.get("token")?.value;
  const userObj =  cookieStore.get("user")?.value;

  if (!token || !userObj) {
    redirect("/login");
  }
   
  
    if(userObj.roles?.includes("restaurant_manager")){
        return(
            <h4>
                You have not sufficient permission to Add Business 
            </h4>
        )
    } 
  
  const getServiceList = await getServices(token);
  let businessList = await getMyBusinesses(token);
  
  async function handleAddBusiness(prevState: any, formData: FormData) {
    "use server";
    console.log (formData.get("secondary_address_checkbox"));
    if (!token) redirect("/login");
  
    const body = {
      name: formData.get("name")?.toString().trim(),
      cloud_kitchen: formData.get("cloud_kitchen") === "on",
      services: formData.get("services"),
      fssai_licence: formData.get("fssai_licence"),
      free_delivery_limit: formData.get("free_delivery_limit"),
      extra_delivery_charges: Number(formData.get("extra_delivery_charges")),

      service_areas: formData.getAll("service_areas"),
      working_days: formData.getAll("working_days"),
      delivery_partners: formData.getAll("delivery_partners"),
      location_lat: 23.0250,
      location_lng: 72.5200,
      address_1: {
        location_address: formData.get("address_1_location"),
        floor: formData.get("address_1_floor"),
        area_locality: formData.get("address_1_locality"),
        city: formData.get("address_1_city"),
        state: formData.get("address_1_state"),
        pincode: formData.get("address_1_pincode"),
      },
      
      address_2: {
        location_address: formData.get("address_2_location") ?? null,
        floor: formData.get("address_2_floor") ?? null,
        area_locality: formData.get("address_2_locality") ?? null,
        city: formData.get("address_2_city") ?? null,
        state: formData.get("address_2_state") ?? null,
        pincode: formData.get("address_2_pincode") ?? null,
      },
    };
    if (formData.get("secondary_address_checkbox")) {
      body.address_2 = {
        location_address: formData.get("address_2_location") ?? null,
        floor: formData.get("address_2_floor") ?? null,
        area_locality: formData.get("address_2_locality") ?? null,
        city: formData.get("address_2_city") ?? null,
        state: formData.get("address_2_state") ?? null,
        pincode: formData.get("address_2_pincode") ?? null,
      };
    }
    const errors: any = {};

    if (!body.name || body.name.length < 3) {
      errors.name = "Business name must be at least 3 characters";
    }

    if (!body.services) {
      errors.services = "Service type is required";
    }

    if (!body.fssai_licence) {
      errors.fssai_licence = "FSSAI licence is required";
    }

    if (!body.address_1.location_address) {
      errors.address = "Address is required";
    }

    if (!body.address_1.pincode || !/^[0-9]{6}$/.test(body.address_1.pincode)) {
      errors.pincode = "Enter valid 6 digit pincode";
    }

    if (body.extra_delivery_charges < 0) {
      errors.extra_delivery_charges = "Delivery charges cannot be negative";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: {
          messageType: "error",
          messageContent:errors
        },
        values: body,
      };
    }

    const res = await addBusiness(body, token);

    if (!res.success) {
      return {
        success: false,
        message: { 
          messageType: "error",
          messageContent:res.message 
        },
        values: body,
      };
    }
    
    return {
      success: true,
      message: { 
        messageType: "success",
        messageContent: "Business Added Successfully"
      },
      values: {},
    };
    
  }

  async function handleUpdate(id:Number) {
    "use server";
    
  }

  async function handleDelete(id:Number) {
      "use server";
      const res = await deleteBusiness(id,token);
      
      if(!res.success){
        return {
          success: false,
          message: { 
            messageType: "error",
            messageContent:res.message 
          }
        }
      }

      revalidatePath("/add-business"); 

      return {
        success: true,
        message: {
          messageType: "success",
          messageContent: "Business deleted successfully"
        }
      };
  }
  
  return (
    <div className="add-business-container">
      <div className="add-business-card">
        <h2>Add Business</h2>
        <AddBusinessForm action={handleAddBusiness} services={getServiceList} />
        <MyBusinessList businessList={businessList} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
      </div>
    </div>
  );
}