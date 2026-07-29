export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: "ADMIN" | "QA_MANAGER" | "INVESTIGATOR" | "CUSTOMER_SUPPORT" | "VIEWER";
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
