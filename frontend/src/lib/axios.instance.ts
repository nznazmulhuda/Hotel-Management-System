import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { baseUrl } from "../config/env.config";

/* -------------------------------------------------------------------------- */
/*                           Core Axios‑wrapper class                         */
/* -------------------------------------------------------------------------- */

class Http {
  /** Singleton Axios instance */
  private static instance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    timeout: 15_000,
    headers: { "Content-Type": "application/json" },
  });

  /** Call this once (e.g. in main.tsx) to activate interceptors */
  static initializeInterceptors(): void {
    /* ----------------------------- Request hook ---------------------------- */
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Example: attach Auth token if you store it in localStorage
        const token = localStorage.getItem("accessToken");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    /* ----------------------------- Response hook --------------------------- */
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        // Centralised error handling (log, toast, etc.)
        console.error("[API Error]", error?.response || error);
        return Promise.reject(error);
      }
    );
  }

  /* ------------------------- Helper HTTP verbs --------------------------- */
  static get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }
  static post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }
  static put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config);
  }
  static patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.patch<T>(url, data, config);
  }
  static delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T>(url, config);
  }
}

/* -------------------------------------------------------------------------- */
/*                          🔑  Auth / User Services                          */
/* -------------------------------------------------------------------------- */

export class AuthAPI {
  static login(body: { email: string; password: string }) {
    return Http.post<{ token: string; user: any }>("/auth/login", body);
  }

  static logout() {
    return Http.post<void>("/auth/logout");
  }

  static me() {
    return Http.get<{ user: any }>("/auth/me");
  }

  static register(body: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    return Http.post<void>("/auth/register", body);
  }
}

/* -------------------------------------------------------------------------- */
/*                              🛏️  Room Module                              */
/* -------------------------------------------------------------------------- */

/** Replace with your real DTOs */
export interface Room {
  id: number;
  number: string;
  type: string;
  status: "Available" | "Booked" | "Maintenance";
  price: number;
}

export class RoomAPI {
  static list() {
    return Http.get<Room[]>("/rooms");
  }

  static details(id: number) {
    return Http.get<Room>(`/rooms/${id}`);
  }

  static create(body: Partial<Room>) {
    return Http.post<Room>("/rooms", body);
  }

  static update(id: number, body: Partial<Room>) {
    return Http.put<Room>(`/rooms/${id}`, body);
  }

  static remove(id: number) {
    return Http.delete<void>(`/rooms/${id}`);
  }
}

/* -------------------------------------------------------------------------- */
/*                           📖  Booking Module                               */
/* -------------------------------------------------------------------------- */

export interface Booking {
  id: number;
  roomId: number;
  guestId: number;
  checkIn: string;
  checkOut: string;
  source: "Walk‑in" | "Online" | "Agent";
  status: "Booked" | "Checked‑in" | "Checked‑out" | "Cancelled";
}

export class BookingAPI {
  static list(params?: { start?: string; end?: string }) {
    return Http.get<Booking[]>("/bookings", { params });
  }

  static create(body: Partial<Booking>) {
    return Http.post<Booking>("/bookings", body);
  }

  static update(id: number, body: Partial<Booking>) {
    return Http.put<Booking>(`/bookings/${id}`, body);
  }

  static cancel(id: number, reason?: string) {
    return Http.post<void>(`/bookings/${id}/cancel`, { reason });
  }

  static checkIn(id: number) {
    return Http.post<void>(`/bookings/${id}/check-in`);
  }

  static checkOut(id: number) {
    return Http.post<void>(`/bookings/${id}/check-out`);
  }
}

/* -------------------------------------------------------------------------- */
/*                          👤  Guest Management                              */
/* -------------------------------------------------------------------------- */

export interface Guest {
  id: number;
  name: string;
  phone: string;
  idNumber: string;
  nationality: string;
  blacklisted: boolean;
}

export class GuestAPI {
  static list(search?: string) {
    return Http.get<Guest[]>("/guests", { params: { search } });
  }

  static details(id: number) {
    return Http.get<Guest>(`/guests/${id}`);
  }

  static create(body: Partial<Guest>) {
    return Http.post<Guest>("/guests", body);
  }

  static update(id: number, body: Partial<Guest>) {
    return Http.put<Guest>(`/guests/${id}`, body);
  }

  static blacklist(id: number, reason: string) {
    return Http.post<void>(`/guests/${id}/blacklist`, { reason });
  }
}

/* -------------------------------------------------------------------------- */
/*                       🏛️  Conference / Hall Booking                       */
/* -------------------------------------------------------------------------- */

export class HallAPI {
  static list() {
    return Http.get<any[]>("/halls");
  }

  static book(body: any) {
    return Http.post<any>("/halls/book", body);
  }

  static updateBooking(id: number, body: any) {
    return Http.put<any>(`/halls/book/${id}`, body);
  }

  static cancelBooking(id: number) {
    return Http.delete<void>(`/halls/book/${id}`);
  }
}

/* -------------------------------------------------------------------------- */
/*                          🧹  Housekeeping Module                           */
/* -------------------------------------------------------------------------- */

export class HousekeepingAPI {
  static tasks(status?: string) {
    return Http.get<any[]>("/housekeeping", { params: { status } });
  }

  static createTask(body: any) {
    return Http.post<any>("/housekeeping", body);
  }

  static updateTask(id: number, body: any) {
    return Http.patch<any>(`/housekeeping/${id}`, body);
  }
}

/* -------------------------------------------------------------------------- */
/*                          🧾  Front Desk Utils                              */
/* -------------------------------------------------------------------------- */

export class FrontDeskAPI {
  static dashboard(date?: string) {
    return Http.get<any>("/frontdesk/dashboard", { params: { date } });
  }

  static walkInCheckIn(body: any) {
    return Http.post<any>("/frontdesk/walkin", body);
  }
}

/* -------------------------------------------------------------------------- */
/*                         🍽️  Restaurant / F&B                              */
/* -------------------------------------------------------------------------- */

export class RestaurantAPI {
  static menu() {
    return Http.get<any[]>("/restaurant/menu");
  }

  static createOrder(body: any) {
    return Http.post<any>("/restaurant/orders", body);
  }

  static orders(status?: string) {
    return Http.get<any[]>("/restaurant/orders", { params: { status } });
  }

  static updateOrder(id: number, body: any) {
    return Http.patch<any>(`/restaurant/orders/${id}`, body);
  }
}

/* -------------------------------------------------------------------------- */
/*                           📅  Calendar Service                             */
/* -------------------------------------------------------------------------- */

export class CalendarAPI {
  static roomCalendar(params: { start: string; end: string }) {
    return Http.get<any[]>("/calendar/rooms", { params });
  }

  static hallCalendar(params: { start: string; end: string }) {
    return Http.get<any[]>("/calendar/halls", { params });
  }

  static housekeepingCalendar(params: { start: string; end: string }) {
    return Http.get<any[]>("/calendar/housekeeping", { params });
  }
}

/* -------------------------------------------------------------------------- */
/*                            ⚙️  System Settings                             */
/* -------------------------------------------------------------------------- */

export class SettingsAPI {
  static getSettings() {
    return Http.get<any>("/settings");
  }

  static updateSettings(body: any) {
    return Http.put<any>("/settings", body);
  }
}

/* -------------------------------------------------------------------------- */
/*                              Module Exports                                */
/* -------------------------------------------------------------------------- */

/**
 * Exporting Http in case you need low‑level access
 * (e.g. for TanStack Query’s `queryFn` or custom modules).
 */
export { Http };
