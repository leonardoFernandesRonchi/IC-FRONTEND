import { TextField } from "@mui/material";

const InputField = ({ label, name, register, errors, type = "text" }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={type}
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      variant="outlined"
    />
  );
};

export default InputField;
