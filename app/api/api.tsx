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

export async function getBusinesses(token: string) {
  const res = await fetch(
    API_URL + "frontend/businesses?services=2&page=1&per_page=50",
    {
      headers: {
        Authorization: "Bearer " + token,
      }
    }
  );

  return res.json();
}

export async function getSingleBusiness(id: string, token: string) {
  console.log(API_URL);
  const res = await fetch(
    API_URL + "frontend/businesses/" + id,
    {
      headers: {
        Authorization: "Bearer " + token,
      }
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error:", errorText);
    throw new Error("Failed to fetch business");
  }

  return res.json();
}