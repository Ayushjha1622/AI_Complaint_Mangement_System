import api from "@/services/api";
import type { LoginResponse, User } from "./authTypes";

export const AuthService = {
  async login(username: string, password: string) {
    const formData = new URLSearchParams();

    formData.append("username", username);
    formData.append("password", password);

    const { data } = await api.post<LoginResponse>(
      "/auth/token",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  },

  async getMe(): Promise<User> {
    const { data } = await api.get<{ success: boolean; message: string; data: User }>("/auth/me");
    return data.data;
  },
};
