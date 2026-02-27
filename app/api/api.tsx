const API_URL = "https://api.tiffinwala.co/api/platform/v1/";

export async function sendOtp(data: any) {
  try {
    const endpoint =
      data.type === "number"
        ? "user/login-via-number"
        : "user/login-via-email";

    const body =
      data.type === "number"
        ? { number: data.value, role: data.role }
        : { email: data.value, role: data.role };

    const res = await fetch(API_URL + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    if (!res.ok) {
  
      throw new Error();
    }

    return result;
  } catch (error: any) {

    return {
      success: false,
      message: "Something went Wrong Please Try Again",
    };
  }
}

export async function verifyOtp(data: any) {
  try {
    const endpoint =
      data.type === "number"
        ? "user/number-verify-otp"
        : "user/email-verify-otp";

    const body =
      data.type === "number"
        ? { number: data.value, code: data.code }
        : { email: data.value, code: data.code };

    const res = await fetch(API_URL + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error("Verification failed");
    }

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:  "Something Went Wrong, Please Try Again",
    };
  }
}
export async function getBusinesses(token: string,selectedService: number) {
  try {
    let url = API_URL + "frontend/businesses?page=1&per_page=50";

    if (selectedService) {
      url += "&service=" + selectedService;
    }
    const res = await fetch(
      url,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        cache: 'force-cache' ,
        next: { revalidate: 3600 } ,
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to fetch businesses",
        status: res.status,
      }
    }

    return {
      success: true,
      data,
      status: res.status,
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
      status: 500,
    }
  }
}
export async function getSingleBusiness(id: string, token: string) {
  try {
    const res = await fetch(API_URL + "frontend/businesses/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to fetch business",
        status: res.status,
      }
    }

    return {
      success: true,
      data,
      status: res.status,
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
      status: 500,
    }
  }
}

export async function updateProfile(data: any, token: string) {
  try {
    const res = await fetch(API_URL + "user/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();  
   
    
    if (!res.ok) {
      return {
        success: false,
        message: result?.message ,
        status: res.status,
      };
    }

    return {
      success: true,
      data: result,
      status: res.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
      status: 500,
    };
  }
}
export async function addBusiness(data: any, token: string) {
  try {
    const res = await fetch(API_URL + "businesses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to add business",
        status: res.status,
      };
    }

    return {
      success: true,
      data: result,
      status: res.status,
    };

  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
      status: 500,
    };
  }
}
export async function getServices(token:string) {
  try{
    const res = await fetch(API_URL + "services", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    });

    const result = await res.json();
  
    if (!res.ok) {
      return {
        success: false,
        message:  "Failed to Fetch Services",
        status: res.status,
      };
    }

    return {
      success: true,
      data: result,
      status: res.status,
    };
  }catch(error){
      return {
        success: false,
        message: "Failed to Fetch Services",
        status: 500,
      };
  }
}
export async function getMyBusinesses(token: string) {
    try{
      const result = await fetch(API_URL + "businesses",{
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        }
      }) ;
      if(!result.ok){
        return{
          success: false,
          message: "Failed Get Your Businesses",
          status: result.status
        }
      }
      return {
        success: true,
        data: await result.json(),
        status: result.status,
      };
    }catch(error){
      return {
        success: false,
        message: "Failed to Fetch Your Businesses",
        status: 500,
      };
    }
}
export async function deleteBusiness(BID:type,token) {
  try{
    const res = await fetch(API_URL + "businesses/" + BID,{
      method: "DELETE",
      headers: {
          Authorization: "Bearer " + token,
      },
      
    });
    
    if(!res.ok){
      return{
        success: false,
        message: "Failed To Delete Business",
        status: 400
      };
    }
    return{
      success: true,
      message: "Business Deleted Successfully",
      status: 200
    };
  }catch(error){
    return{
      success: false,
      message: "Failed To Delete Business",
      status: 500
    }
  }
}