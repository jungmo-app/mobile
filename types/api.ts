export interface ApiResponse<T = undefined> {
  data: T;
  /** 메시지 (example: SUCCESS) */
  message: string;
  /** HTTP 상태코드 (example: 200) */
  code: string;
  /** HTTP 상태 (example: OK) */
  status: number;
}
