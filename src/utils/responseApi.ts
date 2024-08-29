import { NextApiResponse } from "next";

export const responseApi = (
  res: NextApiResponse,
  status: boolean,
  statusCode: number,
  message: string,
  data: any = {}
) => {
  res.status(statusCode).json({
    status,
    statusCode,
    message,
    data,
  });
};

export const responseApiSuccess = (res: NextApiResponse, data: any = {}) => {
  responseApi(res, true, 200, "success", data);
};

export const responseApiFailed = (res: NextApiResponse, data: any = {}) => {
  responseApi(res, false, 400, "failed", data);
};

export const responseApiAccessDenied = (
  res: NextApiResponse,
  data: any = {}
) => {
  responseApi(res, false, 403, "Access Denied", data);
};

export const responseApiNotFound = (res: NextApiResponse, data: any = {}) => {
  responseApi(res, false, 404, "Not Found", data);
};

export const responseApiMethoNotAllowed = (
  res: NextApiResponse,
  data: any = {}
) => {
  responseApi(res, false, 405, "Method Not Allow", data);
};
