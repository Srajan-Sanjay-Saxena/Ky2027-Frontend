import { CookieStrategy } from "wire-axon/auth";

// Base URL includes the API version prefix
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
export const BACKEND_URL = `${BASE_URL}/api/v1`;

// API timeout in milliseconds (10 seconds)
export const API_TIMEOUT = 10000;

export const sharedFeatureConfig = {
  withCredentials: true,
  auth: new CookieStrategy(),
};
