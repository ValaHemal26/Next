"use client";

import { useActionState } from "react";

export  function ProfileForm({ user, action }) {
  const [state, formAction] = useActionState(action, null);

  const values = state?.values || user;
    
  return (
    <form action={formAction}>
      <div className="input-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          defaultValue={values.name || (values.firstName + " " +values.lastName) }
        />
        
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          defaultValue={values.email}
        />
       
      </div>

      <div className="input-group">
        <label>Primary Number</label>
        <input
          type="text"
          name="number"
          defaultValue={values.number || values.contact_number}
        />
      
      </div>

      <div className="input-group">
        <label>Secondary Number (Optional)</label>
        <input
          type="text"
          name="secondary_number"
          defaultValue={values.secondary_number}
        />
       
      </div>
        
        <div className="btn-group">
             <button type="submit" className="save-btn">
                Update Profile
             </button>

            <a href="/profile" className="cancel-btn">
              Cancel
            </a>
        </div>
        <ul>
            {state?.message &&
                Object.values(state.message).map((msg, index) => (
                <li className="msg error" key={index}>{msg}</li>
            ))}
        </ul>
    </form>
  );
}