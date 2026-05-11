import { useEffect, useState } from "react";
import {
  Box,
  Button,
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
      await coletasService.remove(id);

      setColetas((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const loadColetas = async () => {
    try {
      setLoading(true);
      const response = await coletasService.getAll();
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
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" mt={5}>
        <Typography variant="h4">Minhas Coletas</Typography>

        <Button
          sx={{
            minWidth: {
              xs: "auto",
              sm: 10,
            },
          }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Nova coleta
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          {coletas.map((coleta) => (
            <Card
              key={coleta.id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "30%",
                  lg: "15%",
                },

                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                position: "relative",
                overflow: "hidden",

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
                  zIndex: 2,
                  backgroundColor: "rgba(255,255,255,0.85)",

                  "&:hover": {
                    backgroundColor: "rgba(255,0,0,0.15)",
                  },
                }}
              >
                <Trash2 size={18} />
              </IconButton>

              {coleta.image && (
                <Box
                  sx={{
                    width: "100%",
                    height: 180,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`${BACKEND_URL}/uploads/${coleta.image}`}
                    alt="coleta"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              )}

              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    lineHeight: 1.2,

                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {coleta.description}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  📍 Lat: {coleta?.latitude?.toFixed(15)}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  📍 Lng: {coleta?.longitude?.toFixed(15)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
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
