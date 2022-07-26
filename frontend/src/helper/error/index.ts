export const getErrorMessage = (err: any) => {
  if (err.response) {
    return err.response.data.message;
  }
  return err.message;
};