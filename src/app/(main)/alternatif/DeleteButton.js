"use client";

import React from "react";
import { deleteAlternatif } from "@/utils/query";
import { useRouter } from "next/navigation";

const DeleteButton = (id) => {
  const router = useRouter();
  const handleDelete = async () => {
    await deleteAlternatif(id.id);
    router.refresh();
  };
  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
    >
      Hapus
    </button>
  );
};

export default DeleteButton;
