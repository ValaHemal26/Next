"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendOtp } from "../api/api";
import { setCookie } from "../Utils/Functions";
import "../assets/css/style.css";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    value: "",
    type: "", 
    role: "",
  });

  const [message, setMessage] = useState({
    messageType: "",
    messageText: ""
  });
  const [loading, setLoading] = useState(false);

  function validate  ()  {
    if (!formData.type) return "Please select login type";
    if (!formData.role) return "Please select role";
    if (!formData.value) return "Field is required";

    if ( formData.type === "number" && !/^[0-9]{10}$/.test(formData.value) )
      return "Enter valid 10 digit number";

    if (formData.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value))
      return "Enter valid email";

    return "";
  }

  function handleChange  (key: string, value: string)  {
    console.log(formData);
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    
  }

  async function handleSubmit  ()  {
    const err = validate();
    if (err) {
      setMessage({
        messageType: "error",
        messageText: err,
      });
      return;
    }

    setLoading(true);
    
    const res = await sendOtp(formData);

    setLoading(false);

    if (res.success) {
   
      setCookie("formData", JSON.stringify(formData));

      router.push("/verify-otp");
    } else {
      setMessage({
        messageType: "error",
        messageText: res.message,
      });
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <div className="radio-group">
          <p>Select Login Type:</p>
          <div className="radio-wrapper">
            <label>
              <input
                type="radio"
                name="type"
                value="email"
                checked={formData.type === "email"}
                onChange={(e) =>
                  handleChange("type", e.target.value)
                }
              />
              Email
            </label>

            <label>
              <input
                type="radio"
                name="type"
                value="number"
                checked={formData.type === "number"}
                onChange={(e) =>
                  handleChange("type", e.target.value)
                }
              />
              Phone
            </label>
          </div>
        </div>

        <input
          className="auth-input"
          placeholder={
            formData.type === "number"
              ? "Enter 10 digit phone number"
              : "Enter email"
          }
          value={formData.value}
          onChange={(e) =>
            handleChange("value", e.target.value)
          }
        />

        <div className="radio-group">
          <p>Select Role:</p>
          <div className="radio-wrapper">
            <label>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={formData.role === "customer"}
                onChange={(e) =>
                  handleChange("role", e.target.value)
                }
              />
              Customer
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="restaurant_manager"
                checked={
                  formData.role === "restaurant_manager"
                }
                onChange={(e) =>
                  handleChange("role", e.target.value)
                }
              />
              Restaurant Manager
            </label>
          </div>
        </div>

        <button
          className="btn success"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Sending..." : "Send OTP"}
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