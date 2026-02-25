"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendOtp, verifyOtp } from "../api/api";
import { getCookie,setCookie } from "../Utils/Functions";
import "../assets/css/style.css";

export default function VerifyOtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const [authData, setAuthData] = useState({
    value: "",
    type: "" as "number" | "email" | "",
    role: "",
  });

  const [message, setMessage] = useState({
    messageType: "",
    messageText: "",
  });

  useEffect(() => {
    const cookieData = getCookie("formData");

    let formData = null;

    if (cookieData) {
      formData = JSON.parse(cookieData);
    }

    if (!formData.value || !formData.type || !formData.role) {
      router.push("/login");
      return;
    }

    setAuthData({
      value: formData.value,
      type: formData.type,
      role: formData.role,
    });

  }, []);

 async function handleVerify() {
  try {
    if (!/^[0-9]{4,6}$/.test(otp)) {
      setMessage({
        messageType: "error",
        messageText: "Enter valid OTP",
      });
      return;
    }

    setLoading(true);
    setMessage({ messageType: "", messageText: "" });

    const res = await verifyOtp({
      type: authData.type,
      value: authData.value,
      code: Number(otp),
    });
    
    if (!res.data?.token) {
      throw new Error(res.message || "Invalid OTP");
    }

    const { token, ...user } = res.data;
    
    setLoading(false);

    setCookie("token", token);
    setCookie("user", JSON.stringify(user));

    setMessage({
      messageType: "success",
      messageText: "OTP Verified Successfully",
    });
   
    router.push("/business");

  } catch (error: any) {
    console.log(error);
    setMessage({
      messageType: "error",
      messageText: error.message || "Verification failed",
    });
     setLoading(false);
  } 
}

  async function handleResend() {
    setLoading(true);

    const res = await sendOtp({
      type: authData.type,
      value: authData.value,
      role: authData.role,
    });

    setLoading(false);

    if (res.success) {
     
      setMessage({
        messageType: "success",
        messageText: "OTP Resent Successfully",
      });
    } else {
      setMessage({
        messageType: "error",
        messageText: res.message || "Failed to resend OTP",
      });
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Verify OTP</h2>

        <input
          className="auth-input"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          type="submit"
          className="btn success"
          disabled={loading}
          onClick={handleVerify}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button className="btn success resend-btn"  onClick={handleResend} >
          Resend OTP  
        </button>
        {message.messageText && (
          <div className={"msg " + message.messageType}>
            {message.messageText}
          </div>
        )}
      </div>
    </div>
  );
}