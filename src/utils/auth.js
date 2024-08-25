"use server";

import { redirect } from "next/navigation";
import prisma from "./prismaClient";
import { createSession } from "@/utils/session";
import { cookies } from "next/headers";

export async function auth(formData) {
  try {
    const query = await prisma.user.findUnique({
      where: {
        username: formData.get("username"),
        password: formData.get("password"),
      },
    });
    if (!query) {
      throw new Error("Invalid username or password");
    }
    await createSession(query);
  } catch (error) {
    console.error(error);
  }
  redirect("/");
}

export async function register(formData) {
  // console.log(formData);
  try {
    await prisma.user.create({
      data: {
        username: formData.get("username"),
        password: formData.get("password"),
        HM: parseFloat(formData.get("HM")),
        HS: parseFloat(formData.get("HS")),
        HK: parseFloat(formData.get("HK")),
        HC: parseFloat(formData.get("HC")),
        HJ: parseFloat(formData.get("HJ")),
        MS: parseFloat(formData.get("MS")),
        MK: parseFloat(formData.get("MK")),
        MC: parseFloat(formData.get("MC")),
        MJ: parseFloat(formData.get("MJ")),
        SK: parseFloat(formData.get("SK")),
        SC: parseFloat(formData.get("SC")),
        SJ: parseFloat(formData.get("SJ")),
        KC: parseFloat(formData.get("KC")),
        KJ: parseFloat(formData.get("KJ")),
        CJ: parseFloat(formData.get("CJ")),
      },
    });
  } catch (error) {
    console.error(error);
  }
  redirect("/login");
}

export async function logout() {
  cookies().delete("session");
  cookies().delete("id");
  redirect("/login");
}
