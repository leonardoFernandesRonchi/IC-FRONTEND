import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

import CreateAnaliseModal from "./components/CreateAnaliseModal";
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
    <Box p={{ xs: 2, md: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
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
        <Grid container spacing={3}>
          {analises.map((analise) => (
            <Grid item xs={12} md={6} xl={4} key={analise.id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid #e2e8f0",
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                  boxShadow: "0 4px 18px rgba(15,23,42,0.06)",
                  transition: "all .25s ease",

                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 28px rgba(15,23,42,0.12)",
                  },
                }}
              >
                {/* TOP BAR */}
                <Box
                  sx={{
                    height: 6,
                    width: "100%",
                    background:
                      "linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)",
                  }}
                />

                <CardContent sx={{ p: 2.5 }}>
                  {/* HEADER */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={2.5}
                  >
                    <Box sx={{ maxWidth: "75%" }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#64748b",
                          fontWeight: 600,
                          letterSpacing: 0.4,
                        }}
                      >
                        ANÁLISE #{analise.id_analise}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{
                          mt: 0.5,
                          fontWeight: 800,
                          fontSize: "1.05rem",
                          lineHeight: 1.25,
                          color: "#0f172a",
                        }}
                      >
                        {analise.resultado.nome_analise || "Sem nome"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        px: 1.4,
                        py: 0.8,
                        borderRadius: "999px",
                        background:
                          "linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)",
                        border: "1px solid #bae6fd",
                        minWidth: 85,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#0369a1",
                          lineHeight: 1,
                        }}
                      >
                        CÉLULAS
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 800,
                          color: "#0f172a",
                          mt: 0.4,
                        }}
                      >
                        {analise.resultado.total_leveduras}
                      </Typography>
                    </Box>
                  </Box>

                  {/* AREA */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "20px",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#0f172a",
                        mb: 1.8,
                      }}
                    >
                      📏 Área celular
                    </Typography>

                    <Grid container spacing={1.5}>
                      {[
                        {
                          label: "Média",
                          value: `${analise.resultado.area_microns.media?.toFixed(
                            3,
                          )} µm²`,
                        },
                        {
                          label: "Desvio padrão",
                          value: `${analise.resultado.area_microns.desvio_padrao?.toFixed(
                            3,
                          )}`,
                        },
                        {
                          label: "Menor",
                          value: `${analise.resultado.area_microns.min?.toFixed(
                            3,
                          )} µm²`,
                        },
                        {
                          label: "Maior",
                          value: `${analise.resultado.area_microns.max?.toFixed(
                            3,
                          )} µm²`,
                        },
                      ].map((item) => (
                        <Grid item xs={6} key={item.label}>
                          <Box
                            sx={{
                              p: 1.2,
                              borderRadius: 3,
                              backgroundColor: "#f8fafc",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "#64748b",
                                mb: 0.3,
                              }}
                            >
                              {item.label}
                            </Typography>

                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: 14,
                                color: "#0f172a",
                              }}
                            >
                              {item.value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* MORFOLOGIA */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "20px",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#0f172a",
                        mb: 1.8,
                      }}
                    >
                      🔬 Morfologia
                    </Typography>

                    <Grid container spacing={1.5}>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            p: 1.2,
                            borderRadius: 3,
                            backgroundColor: "#f8fafc",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 11,
                              color: "#64748b",
                              mb: 0.3,
                            }}
                          >
                            Circularidade
                          </Typography>

                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: 15,
                              color: "#0f172a",
                            }}
                          >
                            {analise.resultado.circularidade.media?.toFixed(3)}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box
                          sx={{
                            p: 1.2,
                            borderRadius: 3,
                            backgroundColor: "#f8fafc",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 11,
                              color: "#64748b",
                              mb: 0.3,
                            }}
                          >
                            Relação aspecto
                          </Typography>

                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: 15,
                              color: "#0f172a",
                            }}
                          >
                            {analise.resultado.relacao_aspecto.media?.toFixed(
                              3,
                            )}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Analises;
