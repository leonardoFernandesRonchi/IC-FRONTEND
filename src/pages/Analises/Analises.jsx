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
import { Trash2 } from "react-feather";

import CreateAnaliseModal from "./components/CreateAnaliseModal";
import { coletasService } from "@/services";
import { Create } from "@mui/icons-material";

const Analises = () => {
  const [coletas, setColetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  console.log(coletas);

  const loadColetas = async () => {
    try {
      setLoading(true);
      const response = await coletasService.getMyColetas();
      setColetas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadColetas();
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
        onSuccess={loadColetas}
        coletas={coletas}
      />
    </Box>
  );
};

export default Analises;
