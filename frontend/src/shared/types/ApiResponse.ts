// shared/types/ApiResponse.ts
export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;       
  totalPages?: number; 
  mensaje?: string;
}