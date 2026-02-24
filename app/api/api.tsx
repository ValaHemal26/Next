const API_URL = "https://api.tastytiffin.co/api/platform/v1/";

export async function sendOtp(data: any) {
  const endpoint =
    data.type === "number"
      ? "user/login-via-number"
      : "user/login-via-email";

  const body =  data.type === "number"
      ? { number: data.value, role: data.role }
      : { email: data.value, role: data.role };

  const res = await fetch(API_URL + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return await res.json();
}

export async function verifyOtp(data: any) {
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

  return await res.json();
}

export async function getBusinesses(token: string,selectedService: number) {
  try {
    let url = API_URL + "frontend/businesses?page=1&per_page=50";

    if (selectedService) {
      url += `&service=${selectedService}`;
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