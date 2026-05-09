import { apiClient } from "./apiClient";

const create = async ({
  nome_amostra,
  descricao,
  imagem_microscopica,
  imagem_colonia,
}) => {
  const formData = new FormData();

  formData.append("nome_amostra", nome_amostra);
  formData.append("descricao", descricao);

  formData.append("imagem_microscopica", imagem_microscopica);
  formData.append("imagem_colonia", imagem_colonia);

  const response = await apiClient.post("/analises", formData);

  return response.data;
};

const getAll = async () => {
  const response = await apiClient.get("/analises");
  return response;
};

export default {
  create,
  getAll,
};
