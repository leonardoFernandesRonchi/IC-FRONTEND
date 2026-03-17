import React, { useState } from "react";
import { Box, Typography, Paper, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  InputField,
  SubmitButton,
  CustomSnackbar,
  Spinning,
} from "@/components";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import schema from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { usersService } from "@/services";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [block, setBlock] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setBlock(true);
      setLoading(true);
      await usersService.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setSnackbar({
        message: "Cadastro realizado com sucesso!",
        variant: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      setSnackbar({
        message:
          `${error?.response?.data?.message}` || "Erro ao realizar cadastro",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Spinning open={loading} />
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={1}>
          Criar conta
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Preencha os dados abaixo para se cadastrar
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Nome de usuário"
            name="username"
            register={register}
            errors={errors}
          />
          <InputField
            label="Email"
            name="email"
            register={register}
            errors={errors}
          />

          <InputField
            label="Senha"
            name="password"
            type="password"
            register={register}
            errors={errors}
          />

          <InputField
            label="Confirmar senha"
            name="confirmPassword"
            type="password"
            register={register}
            errors={errors}
          />

          {snackbar && (
            <Box sx={{ paddingTop: "2rem" }}>
              <CustomSnackbar
                open={true}
                onClose={() => setSnackbar(null)}
                message={snackbar.message}
                variant={snackbar.variant}
              />
            </Box>
          )}
          <SubmitButton disabled={block}>Cadastrar</SubmitButton>

          <Typography
            textAlign="center"
            fontSize={12}
            color="text.secondary"
            mt={3}
            mb={1}
          >
            JÁ TEM UMA CONTA?
          </Typography>

          <Link
            component={RouterLink}
            to="/"
            underline="hover"
            display="block"
            textAlign="center"
            fontSize={14}
          >
            Fazer login
          </Link>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
