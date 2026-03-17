import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./schema";
import { coletasService } from "@/services";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationMarker = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return null;
};

const CreateColetaModal = ({ open, setOpen, onSuccess }) => {
  const [position, setPosition] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "",
      image: null,
    },
  });

  const searchLocation = async (query) => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query,
        )}`,
      );

      const data = await response.json();

      if (data.length > 0) {
        setPosition({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    if (!position) {
      alert("Selecione a localização.");
      return;
    }

    await coletasService.createColeta({
      latitude: position.lat,
      longitude: position.lng,
      description: data.description,
      image: data.image,
    });

    setOpen(false);
    setPosition(null);
    reset();
    onSuccess();
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
      <DialogTitle>Criar Coleta</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Pesquisar local"
              fullWidth
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  searchLocation(e.target.value);
                }
              }}
            />

            {/* 🗺️ MAPA */}
            <Box sx={{ height: 300, width: "100%" }}>
              <MapContainer
                center={[-22.2201, -49.9505]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker setPosition={setPosition} />

                {position && <Marker position={position} />}
              </MapContainer>
            </Box>

            {/* 📝 DESCRIPTION */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descrição"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            {/* 📁 IMAGE */}
            <Controller
              name="image"
              control={control}
              render={() => (
                <input
                  type="file"
                  onChange={(e) => {
                    setValue("image", e.target.files[0]);
                  }}
                />
              )}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Criar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateColetaModal;
