import * as yup from "yup";

const schema = yup.object().shape({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .test(
      "word-limit",
      "Máximo de 20 palavras",
      (value) => !value || value.trim().split(/\s+/).length <= 20,
    ),
  description: yup.string(),
  imagemColonia: yup.mixed().required("Imagem da colônia é obrigatória"),
  imagemMicroscopica: yup.mixed().required("Imagem microscópica é obrigatória"),
});

export default schema;
