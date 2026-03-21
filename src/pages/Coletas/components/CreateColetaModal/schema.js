import * as yup from "yup";

const schema = yup.object().shape({
  description: yup
    .string()
    .required("Descrição é obrigatória")
    .test(
      "word-limit",
      "Máximo de 20 palavras",
      (value) => !value || value.trim().split(/\s+/).length <= 20,
    ),
  image: yup.mixed().required("A imagem é obrigatória"),
});

export default schema;
