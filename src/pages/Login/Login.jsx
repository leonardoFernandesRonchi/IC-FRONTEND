import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { InputField } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { usersService } from "@/services";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState(false);
  const { login } = useAuth();

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
      setLoading(true);
      await usersService.login({
        email: data.email,
        password: data.password,
      });
      login();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5", // neutro clean
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2, // padding lateral p/ mobile
      }}
    >
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
          Bem-vindo de volta
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Insira suas credenciais para acessar sua conta
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {/* <Link href="#" underline="hover" fontSize={13}>
              Esqueceu a senha?
            </Link> */}
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#2F80ED",
            }}
          >
            Entrar
          </Button>

          <Typography
            textAlign="center"
            fontSize={12}
            color="text.secondary"
            mt={3}
            mb={2}
          >
            NOVO POR AQUI?
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            component={Link}
            to="/register"
            sx={{
              borderRadius: 2,
              py: 1.2,
              textTransform: "none",
            }}
          >
            Criar conta
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
