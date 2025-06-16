import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function signupUser(data: { email: string; password: string }) {
  try {
    const r = await axios.post(`/api/v1/auth/new/basic`, data);
    console.log(r);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
}

export async function signinUser(data: {
  email: string;
  password: string;
}): Promise<string | undefined> {
  try {
    const { data: token } = await axios.post<string>(
      "/api/v1/auth/basic",
      data
    );
    return token;
  } catch (e) {
    console.error(e);
  }
}
