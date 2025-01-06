export declare namespace API {
  export type BaseResponse = { created_at: string } | { created_at: string }[];
  export type ErrorResponse = {
    code: number;
    app_error_code: string | null;
    title: string | null;
    message: string;
    errors: string[] | null;
  };
}
