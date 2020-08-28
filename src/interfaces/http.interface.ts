/**
 * HTTP interface.
 * @file HTTP 响应接口模型
 */

export type ExceptionOption = {
  message: string;
  error?: any
};

// 响应状态
export enum EHttpStatus {
  Error = 'error',
  Success = 'success',
}

// HTTP 状态返回
export interface HttpResponseBase {
  status: EHttpStatus;
  message: string;
}

// HTTP error
export type HttpErrorResponse = HttpResponseBase & {
  error: any;
  debug?: string
};

// HTTP success 返回
export type HttpSuccessResponse<T> = HttpResponseBase & {
  result: T
};

// HTTP Response
export type HttpResponse<T> = HttpErrorResponse | HttpSuccessResponse<T>;
