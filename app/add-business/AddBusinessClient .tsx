"use client";

import { useState } from "react";
import { AddBusinessForm } from "./AddBusinessForm";
import { MyBusinessList } from "./MyBusinessList";
import { getSingleBusiness } from "../api/api";

export function AddBusinessClient({
  token,
  services,
  businessList,
  handleAddBusiness,
  handleDelete
}) {

  const [editingBusiness, setEditingBusiness] = useState<any>(null);

  async function handleUpdate(id: string) {
    const res = await getSingleBusiness(id, token);

    if (res.success) {
      setEditingBusiness(res.data.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <>
      <AddBusinessForm
        action={handleAddBusiness}
        services={services}
        editingBusiness={editingBusiness}
        setEditingBusiness={setEditingBusiness}
      />

      <MyBusinessList
        businessList={businessList}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </>
  );
}