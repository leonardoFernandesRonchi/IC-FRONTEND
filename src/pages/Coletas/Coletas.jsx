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

import { coletasService } from "@/services";
import { CreateColetaModal } from "./components";

const Coletas = () => {
  const [coletas, setColetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const BACKEND_URL = (
    import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:3001"
  ).replace(/\/$/, "");

  const handleDelete = async (id) => {
    try {
      await coletasService.deleteColeta(id);

      setColetas((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

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
      <Box display="flex" justifyContent="space-between" mt={5}>
        <Typography variant="h4">Minhas Coletas</Typography>

        <Button variant="contained" onClick={() => setOpen(true)}>
          Criar nova coleta
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {coletas.map((coleta) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={coleta.id}>
              <Card
                sx={{
                  minWidth: "100%",
                  maxWidth: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  position: "relative",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <IconButton
                  onClick={() => handleDelete(coleta.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255,0,0,0.2)",
                    },
                  }}
                >
                  <Trash2 size={18} />
                </IconButton>

                {coleta.image && (
                  <Box sx={{ height: 180, overflow: "hidden" }}>
                    <img
                      src={`${BACKEND_URL}/uploads/${coleta.image}`}
                      alt="coleta"
                      style={{
                        minWidth: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {coleta.description}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    📍 Lat: {coleta.latitude}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    📍 Lng: {coleta.longitude}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <CreateColetaModal
        open={open}
        setOpen={setOpen}
        onSuccess={loadColetas}
      />
    </Box>
  );
};

export default Coletas;
