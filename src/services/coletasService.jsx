import { apiClient } from "./apiClient";

const create = async ({ latitude, longitude, description, image, coletaType }) => {
  const formData = new FormData();

  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("description", description);
  formData.append("coletaType", coletaType);

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

const getAll = async (coletaType) => {
  const response = await apiClient.get("/coletas", {
    params: {
      coletaType
    }
  }
  );
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
