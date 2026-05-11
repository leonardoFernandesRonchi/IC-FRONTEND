import { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

import { AnaliseCard, CreateAnaliseModal } from "./components";
import { coletasService, analisesService } from "@/services";

const Analises = () => {
  const [coletasMicroscopicas, setColetasMicroscopicas] = useState([]);
  const [coletasColonia, setColetasColonia] = useState([]);
  const [analises, setAnalises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const loadColetas = async (setState, coletaType) => {
    try {
      const response = await coletasService.getAll(coletaType);
      setState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadAnalises = async () => {
    try {
      const response = await analisesService.getAll();
      console.log(response);
      setAnalises(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadAllColetas = async () => {
    try {
      setLoading(true);

      await Promise.all([
        loadColetas(setColetasMicroscopicas, "Microscópica"),
        loadColetas(setColetasColonia, "Colonia"),
        loadAnalises(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllColetas();
  }, []);

  return (
    <Box pt={6}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
        pt={3}
        gap={2}
        mb={4}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: "1.8rem",
              sm: "2.2rem",
            },
          }}
        >
          Minhas Análises
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.2,
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Criar nova análise
        </Button>
      </Box>

      <CreateAnaliseModal
        open={open}
        setOpen={setOpen}
        onSuccess={loadAllColetas}
        coletasMicroscopicas={coletasMicroscopicas}
        coletasColonia={coletasColonia}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : (
        <Box width="100%" height="100%" display="flex" flexWrap="wrap" gap={1}>
          {analises.map((analise) => (
            <Box
              display="flex"
              flexWrap="nowrap"
              gap={3}
              key={analise.id_analise}
            >
              <AnaliseCard analise={analise} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Analises;
