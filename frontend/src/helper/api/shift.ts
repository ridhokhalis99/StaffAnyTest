import { getAxiosInstance } from ".";

export const getShifts = async (startDate: string, endDate: string) => {
  const api = getAxiosInstance();
  const { data } = await api.get(
    `/shifts?order[date]=DESC&order[startTime]=ASC&where=${startDate}&where=${endDate}`
  );
  return data;
};

export const getShiftById = async (id: string) => {
  const api = getAxiosInstance();
  const { data } = await api.get(`/shifts/${id}`);
  return data;
};

export const createShifts = async (payload: any) => {
  const api = getAxiosInstance();
  const { data } = await api.post("/shifts", payload);
  return data;
};

export const updateShiftById = async (id: string, payload: any) => {
  const api = getAxiosInstance();
  const { data } = await api.patch(`/shifts/${id}`, payload);
  return data;
};

export const deleteShiftById = async (id: string) => {
  const api = getAxiosInstance();
  const { data } = await api.delete(`/shifts/${id}`);
  return data;
};

export const publishShift = async (startDate: string, endDate: string) => {
  const api = getAxiosInstance();
  const { data } = await api.patch(
    `/shifts/publish?where=${startDate}&where=${endDate}`
  );
  return data;
};
