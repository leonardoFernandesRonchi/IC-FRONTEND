// components/AnaliseCard.jsx

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const AnaliseCard = ({ analise }) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        border: "1px solid #e2e8f0",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
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
          background: "linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)",
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
              background: "linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)",
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

        {/* ÁREA */}
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
                value:
                  analise.resultado.area_microns.media != null
                    ? `${analise.resultado.area_microns.media.toFixed(3)} µm²`
                    : "0.000 µm²",
              },
              {
                label: "Desvio padrão",
                value:
                  analise.resultado.area_microns.desvio_padrao != null
                    ? `${analise.resultado.area_microns.desvio_padrao.toFixed(3)}`
                    : "0.000",
              },
              {
                label: "Menor",
                value:
                  analise.resultado.area_microns.min != null
                    ? `${analise.resultado.area_microns.min.toFixed(3)} µm²`
                    : "0.000 µm²",
              },
              {
                label: "Maior",
                value:
                  analise.resultado.area_microns.max != null
                    ? `${analise.resultado.area_microns.max.toFixed(3)} µm²`
                    : "0.000 µm²",
              },
            ].map((item) => (
              <Grid item xs={6} key={item.label}>
                <Box
                  sx={{
                    p: 1.2,
                    borderRadius: 3,
                    backgroundColor: "#f8fafc",
                    minHeight: 72,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
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
                  {analise.resultado.circularidade.media != null
                    ? analise.resultado.circularidade.media.toFixed(3)
                    : "0.000"}
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
                  {analise.resultado.relacao_aspecto.media != null
                    ? analise.resultado.relacao_aspecto.media.toFixed(3)
                    : "0.000"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnaliseCard;
