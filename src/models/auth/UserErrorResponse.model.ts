export class UserErrorResponse {
  status?:  string;
  message?: string;
  data?:    ErrorResponseData;
}

export class ErrorResponseData {
  succeeded?: boolean;
  errors?:    ErrorList[];
}

export class ErrorList {
  code?:        string;
  description?: string;
}
