"use client";

import { useEffect, useActionState, useState } from "react";

export function AddBusinessForm({
  action,
  services,
  editingBusiness,
  setEditingBusiness,
}) {
  const [state, formAction] = useActionState(action, null);

  const initialState = {
    id: "",
    name: "",
    cloud_kitchen: false,
    services: "",
    fssai_licence: "",
    free_delivery_limit: "",
    extra_delivery_charges: "",
    service_areas: [],
    working_days: [],
    delivery_partners: [],
    secondary_address_checkbox: false,
    address_1: {
      location_address: "",
      floor: "",
      area_locality: "",
      city: "",
      state: "",
      pincode: "",
    },
    address_2: null,
  };

  const [formData, setFormData] = useState(initialState);

  function handleChange(e: any) {
    const { name, value, type, checked, multiple, options } = e.target;

    if (multiple) {
      const selected = Array.from(options)
        .filter((o: any) => o.selected)
        .map((o: any) => o.value);

      setFormData((prev: any) => ({ ...prev, [name]: selected }));
      return;
    }

    if (type === "checkbox") {
      setFormData((prev: any) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }
    
    if (name.startsWith("address_1_")) {

      const field = name.replace("address_1_", "");
      setFormData((prev: any) => ({
        ...prev,
        address_1: {
          ...prev.address_1,
          [field === "location" ? "location_address" : field]: value,
        },
      }));
      return;
    }

    if (name.startsWith("address_2_")) {
      const field = name.replace("address_2_", "");
      setFormData((prev: any) => ({
        ...prev,
        address_2: {
          ...prev.address_2,
          [field === "location" ? "location_address" : field]: value,
        },
      }));
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }
  
  useEffect(() => {
    if (state?.success) {
      setFormData(initialState);
      setEditingBusiness(null);
    }
  }, [state?.success]);
  
  useEffect(() => {
    if (editingBusiness) {
      setFormData({
        ...initialState,
        ...editingBusiness,
        id: editingBusiness.id,
        service_areas: Array.isArray(editingBusiness.service_areas)
        ? editingBusiness.service_areas
        : editingBusiness.service_areas
        ? editingBusiness.service_areas.split(",")
        : [],

      working_days: Array.isArray(editingBusiness.working_days)
        ? editingBusiness.working_days
        : editingBusiness.working_days
        ? editingBusiness.working_days.split(",")
        : [],

      delivery_partners: Array.isArray(editingBusiness.delivery_partners)
        ? editingBusiness.delivery_partners
        : editingBusiness.delivery_partners
        ? editingBusiness.delivery_partners.split(",")
        : [],
        secondary_address_checkbox: !!editingBusiness.address_2,
        address_1: editingBusiness.address_1 || initialState.address_1,
        address_2: editingBusiness.address_2,
      });
    }
  }, [editingBusiness]);
  
  useEffect(() => {
    if (state?.values && !state.success) {
      setFormData((prev: any) => ({
        ...prev,
        ...state.values,
      }));
    }
  }, [state]);
  
  

  return (
    <form action={formAction} className="business-form">
      {formData?.id && (
        <input type="hidden" name="id" value={formData.id} />
      )}

      <div className="grid-3">
        <div className="input-group">
          <label>Business Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="cloud_kitchen"
              checked={formData.cloud_kitchen}
              onChange={handleChange}
            />
            Cloud Kitchen
          </label>
        </div>

        <div className="input-group">
          <label>Service Type</label>
          <select
            name="services"
            value={formData.services}
            onChange={handleChange}
          >
            <option value="">Select Service</option>
            {services.data.data.map((s: any) => (
              <option key={s.id} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>FSSAI Licence</label>
          <input
            type="text"
            name="fssai_licence"
            value={formData.fssai_licence}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Free Delivery Limit</label>
          <input
            type="text"
            name="free_delivery_limit"
            value={formData.free_delivery_limit}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Extra Delivery Charges</label>
          <input
            type="number"
            name="extra_delivery_charges"
            value={formData.extra_delivery_charges}
            onChange={handleChange}
          />
        </div>
      </div>

      <h3>Primary Address</h3>
      <div className="grid-3">
        <input name="address_1_location" value={formData.address_1.location_address} onChange={handleChange} placeholder="Address" />
        <input name="address_1_floor" value={formData.address_1.floor} onChange={handleChange} placeholder="Floor" />
        <input name="address_1_area_locality" value={formData.address_1.area_locality} onChange={handleChange} placeholder="Locality" />
        <input name="address_1_city" value={formData.address_1.city} onChange={handleChange} placeholder="City" />
        <input name="address_1_state" value={formData.address_1.state} onChange={handleChange} placeholder="State" />
        <input name="address_1_pincode" value={formData.address_1.pincode} onChange={handleChange} placeholder="Pincode" />
      </div>

      <div className="checkbox-toggle">
        <label>
          <input
            type="checkbox"
            name="secondary_address_checkbox"
            checked={formData.secondary_address_checkbox}
            onChange={(e) => {
              handleChange(e);
              if (e.target.checked) {
                setFormData((prev: any) => ({
                  ...prev,
                  address_2: initialState.address_1,
                }));
              } else {
                setFormData((prev: any) => ({
                  ...prev,
                  address_2: null,
                }));
              }
            }}
          />
          Add Secondary Address
        </label>
      </div>

      {formData.secondary_address_checkbox && formData.address_2 && (
        <>
          <h3>Secondary Address</h3>
          <div className="grid-3">
            <input name="address_2_location" value={formData.address_2.location_address} onChange={handleChange} placeholder="Address" />
            <input name="address_2_floor" value={formData.address_2.floor} onChange={handleChange} placeholder="Floor" />
            <input name="address_2_area_locality" value={formData.address_2.area_locality} onChange={handleChange} placeholder="Locality" />
            <input name="address_2_city" value={formData.address_2.city} onChange={handleChange} placeholder="City" />
            <input name="address_2_state" value={formData.address_2.state} onChange={handleChange} placeholder="State" />
            <input name="address_2_pincode" value={formData.address_2.pincode} onChange={handleChange} placeholder="Pincode" />
          </div>
        </>
      )}
      <div className="grid-3">

        <div className="input-group">
          <label>Service Areas</label>
          <select
            name="service_areas"
            multiple
            value={formData.service_areas || []}
            onChange={handleChange}
          >
            <option value="bhayli">Bhayli</option>
            <option value="alkapuri">Alkapuri</option>
            <option value="sama">Sama</option>
            <option value="manjalpur">Manjalpur</option>
          </select>
        </div>

        <div className="input-group">
          <label>Working Days</label>
          <select
            name="working_days"
            multiple
            value={formData.working_days || []}
            onChange={handleChange}
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
          </select>
        </div>

        <div className="input-group">
          <label>Delivery Partners</label>
          <select
            name="delivery_partners"
            multiple
            value={formData.delivery_partners || []}
            onChange={handleChange}
          >
            <option value="instamart">Instamart</option>
            <option value="blinkit">Blinkit</option>
            <option value="zepto">Zepto</option>
          </select>
        </div>

      </div>
      {state?.message && (
        <ul>
          {typeof state.message.messageContent === "object"
            ? Object.values(state.message.messageContent).map(
                (msg: any, index: number) => (
                  <li key={index} className={"msg " + state.message.messageType}>
                    {msg}
                  </li>
                )
              )
            : (
              <li className={"msg " + state.message.messageType}>
                {state.message.messageContent}
              </li>
            )}
        </ul>
      )}

      <div className="btn-group">
        <button type="submit" className="save-btn">
          {formData.id ? "Update Business" : "Add Business"}
        </button>
      </div>
    </form>
  );
}