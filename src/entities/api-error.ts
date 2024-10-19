export interface ErrorData {
  data?: Object;
  code?: Number;
  status?: Boolean;
}

export interface ApiError {
  error: ErrorData;
}
