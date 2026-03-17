import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha precisa ter no mínimo 6 caracteres")
    .required("Senha obrigatória"),
});

export default schema;
