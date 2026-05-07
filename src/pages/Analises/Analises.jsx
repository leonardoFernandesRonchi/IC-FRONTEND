import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";

import CreateAnaliseModal from "./components/CreateAnaliseModal";
import { coletasService } from "@/services";

const Analises = () => {
  const [coletasMicroscopicas, setColetasMicroscopicas] = useState([])
  const [coletasColonia, setColetasColonia] = useState([])
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);


  const loadColetas = async (setState, coletaType) => {
    try {
      setLoading(true);
      const response = await coletasService.getAll(
        coletaType
      );
      setState(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllColetas = () => {
   loadColetas(setColetasMicroscopicas, "Microscópica");
    loadColetas(setColetasColonia, "Colonia")
  }


  console.log(coletasMicroscopicas)
  console.log(coletasColonia)
  useEffect(() => {
   loadAllColetas()
  }, []);
  return (
    <Box p={3}>
      {loading ? <CircularProgress /> : null}
      <Box display="flex" justifyContent="space-between" mt={5}>
        <Typography variant="h4">Minhas Análises</Typography>

        <Button variant="contained" onClick={() => setOpen(true)}>
          Criar nova Análise
        </Button>
      </Box>

      <CreateAnaliseModal
        open={open}
        setOpen={setOpen}
        onSuccess={loadAllColetas}
        coletasMicroscopicas={coletasMicroscopicas}
        coletasColonia={coletasColonia}
      />
    </Box>
  );
};

export default Analises;
