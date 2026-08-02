export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface HealthResponse {
  status: "ok";
  service: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  role: string;
  isActive: boolean;
}
