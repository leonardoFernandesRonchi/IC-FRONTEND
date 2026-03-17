import { apiClient } from "./apiClient";

const createColeta = async ({ latitude, longitude, description, image }) => {
  const formData = new FormData();

  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("description", description);

  if (image) {
    formData.append("image", image);
  }

  const response = await apiClient.post("/coletas", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const getMyColetas = async () => {
  const response = await apiClient.get("/coletas");
  return response;
};

const deleteColeta = async (id) => {
  const response = await apiClient.delete(`/coletas/${id}`);
  return response;
};

export default {
  createColeta,
  getMyColetas,
  deleteColeta,
};
