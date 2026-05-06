import { apiClient } from "./apiClient";

const create = async ({ latitude, longitude, description, image }) => {
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

const getAll = async () => {
  const response = await apiClient.get("/coletas");
  return response;
};

const remove = async (id) => {
  const response = await apiClient.delete(`/coletas/${id}`);
  return response;
};

export default {
  create,
  getAll,
  remove,
};
