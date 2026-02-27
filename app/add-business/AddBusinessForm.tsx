"use client";

import { useEffect,useActionState, useState } from "react";

export function AddBusinessForm({ action,services }) {
  const [state, formAction] = useActionState(action, null);
  const values = state?.values || {};

  const [showAddress2, setShowAddress2] = useState(false);

  useEffect(() => {
    setShowAddress2(values.secondary_address_checkbox == 1);
  }, [values.secondary_address_checkbox]);

  return (
    <form action={formAction} className="business-form">

      <div className="grid-3">
        <div className="input-group">
          <label>Business Name</label>
          <input type="text" name="name" defaultValue={values.name} />
        </div>

        <div className="input-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="cloud_kitchen"
              defaultChecked={values.cloud_kitchen}
            />
            Cloud Kitchen
          </label>
        </div>

        <div className="input-group">
          <label>Service Type</label>
          <select name="services" id="">
            <option value="">Select Service</option>
            {
                services.data.data.map((s)=>
                     <option key={s.id} value={s.slug}>{s.name}</option>
                )
            }
          </select>
        </div>

        <div className="input-group">
          <label>FSSAI Licence</label>
          <input
            type="text"
            name="fssai_licence"
            defaultValue={values.fssai_licence}
          />
        </div>

        <div className="input-group">
          <label>Free Delivery Limit</label>
          <input
            type="text"
            name="free_delivery_limit"
            defaultValue={values.free_delivery_limit}
          />
        </div>

        <div className="input-group">
          <label>Extra Delivery Charges</label>
          <input
            type="number"
            name="extra_delivery_charges"
            defaultValue={values.extra_delivery_charges}
          />
        </div>
      </div>

      <h3>Primary Address</h3>
      <div className="grid-3">
        <input type="text" name="address_1_location" placeholder="Address" defaultValue={values.address_1?.location_address} />
        <input type="text" name="address_1_floor" placeholder="Floor" defaultValue={values.address_1?.floor} />
        <input type="text" name="address_1_locality" placeholder="Locality" defaultValue={values.address_1?.area_locality} />
        <input type="text" name="address_1_city" placeholder="City" defaultValue={values.address_1?.city} />
        <input type="text" name="address_1_state" placeholder="State" defaultValue={values.address_1?.state} />
        <input type="text" name="address_1_pincode" placeholder="Pincode" defaultValue={values.address_1?.pincode} />
      </div>

      <div className="checkbox-toggle">
        <label>
          <input
            type="checkbox"
            name="secondary_address_checkbox"
            value={1}
            defaultChecked={showAddress2}
            onChange={(e) => setShowAddress2(e.target.checked)}
            />
          Add Secondary Address
        </label>
      </div>

      {showAddress2 && (
        <>
          <h3>Secondary Address</h3>
          <div className="grid-3">
            <input type="text" name="address_2_location" placeholder="Address" />
            <input type="text" name="address_2_floor" placeholder="Floor" />
            <input type="text" name="address_2_locality" placeholder="Locality" />
            <input type="text" name="address_2_city" placeholder="City" />
            <input type="text" name="address_2_state" placeholder="State" />
            <input type="text" name="address_2_pincode" placeholder="Pincode" />
          </div>
        </>
      )}

      <div className="grid-3">

        <div className="input-group">
          <label>Service Areas</label>
          <select name="service_areas" multiple>
            <option value="bhayli">Bhayli</option>
            <option value="alkapuri">Alkapuri</option>
            <option value="sama">Sama</option>
            <option value="manjalpur">Manjalpur</option>
          </select>
        </div>

        <div className="input-group">
          <label>Working Days</label>
          <select name="working_days" defaultValue={values.working_days} multiple>
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
          <select name="delivery_partners" multiple>
            <option value="instamart">Instamart</option>
            <option value="blinkit">Blinkit</option>
            <option value="zepto">Zepto</option>
          </select>
        </div>

      </div>

      {state?.message &&
        <ul>
          {
            typeof (state.message.messageContent) === "object" ?

              Object.values(state.message.messageContent).map((msg: any, index: number) => (

                <li key={index} className={"msg " + state.message.messageType}>{msg}</li>

              )) : 

            <li  className={"msg " + state?.message.messageType}>{state?.message.messageContent}</li>
          }
        </ul>
      }

      <div className="btn-group">
        <button type="submit" className="save-btn">
          Add Business
        </button>
      </div>
    </form>
  );
}