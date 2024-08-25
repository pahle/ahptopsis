"use client"

import React from "react";
import { createReview } from "@/utils/query";
import { Container } from "@/components/Container";
import Link from "next/link";

const CreateReview = ({searchParams}) => {
  const initialValue = {
    review: "",
    rating: 0,
    alternatifId: parseInt(searchParams.id),
  };

  const [form, setForm] = React.useState(initialValue);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview(form);
    setForm(initialValue);
    history.back();
  };
  return (
    <CreateReviewPage id={searchParams.id}>
      <h1 className="text-start font-bold mb-8">
        Create Review
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="review">Review</label>
          <input
            type="text"
            name="review"
            id="review"
            value={form.review}
            onChange={handleChange}
            className="border-2 border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="rating">Rating</label>
          <select name="rating" id="rating" value={form.rating} onChange={handleChange} className="border-2 border-gray-400 p-2 rounded-lg w-full">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-300 w-24 p-2 rounded-lg self-center mt-4"
        >
          Submit
        </button>
      </form>
    </CreateReviewPage>
  );
};

const CreateReviewPage = ({children, id}) => {
  return (
    <div className="py-10 pb-12 pt-16">
      <Container>
        <div className="grid grid-cols-3 items-center">
          <Link
            className="text-xl font-semibold leading-7 text-pink-500"
            href={`/alternatif/${id}`}
          >
            {'<'} Kembali
          </Link>
          <h1 className="text-center text-4xl font-bold leading-7 text-slate-900">
            Tambah Review
          </h1>
        </div>
      </Container>
      <div className="mt-12 divide-y divide-slate-100 lg:border-t lg:border-slate-100">
        <Container>
          {children}
        </Container>
      </div>
    </div>
  )
}

export default CreateReview
