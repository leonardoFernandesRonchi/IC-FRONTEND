import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";

const CreateAnaliseModal = ({ open, setOpen, onSuccess, coletasMicroscopicas, coletasColonia }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "",
      image: null,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Criar nova Análise</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box>
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome"
                  fullWidth
                  multiline
                  rows={1}
                  error={!!errors.nome}
                  helperText={errors.nome?.message}
                />
              )}
            />

            <Box mt={2}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descrição"
                    fullWidth
                    multiline
                    rows={1}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Box>

            <Box mt={2}>
              <Controller
                name="imagemMicroscopica"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="idade-label">
                      Imagem Microscópica
                    </InputLabel>
                    {coletasMicroscopicas.length === 0 ? (
                      <Typography variant="body2" color="textSecondary">
                        Você precisa criar uma coleta antes de criar uma
                        análise.
                      </Typography>
                    ) : (
                      <Select
                        {...field}
                        labelId="idade-label"
                        label="Imagem Microscópica"
                      >
                        {coletasMicroscopicas.map((coleta) => (
                          <MenuItem key={coleta.id} value={coleta.id}>
                            {coleta.description}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                )}
              />
            </Box>

            <Box mt={2}>
              <Controller
                name="imagemColonia"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="idade-label">Imagem da Colonia</InputLabel>
                    {coletasColonia.length === 0 ? (
                      <Typography variant="body2" color="textSecondary">
                        Você precisa criar uma coleta antes de criar uma
                        análise.
                      </Typography>
                    ) : (
                      <Select
                        {...field}
                        labelId="idade-label"
                        label="Imagem da Colonia"
                      >
                        {coletasColonia.map((coleta) => (
                          <MenuItem key={coleta.id} value={coleta.id}>
                            {coleta.description}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                )}
              />
            </Box>
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

export default CreateAnaliseModal;
