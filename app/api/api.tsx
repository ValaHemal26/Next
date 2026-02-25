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
      }
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