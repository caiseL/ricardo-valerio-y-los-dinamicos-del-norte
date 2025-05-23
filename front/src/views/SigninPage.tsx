import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { ApiService } from "../services/api.service"; 

const SigninPage: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    nombre: "",
    password: "",
    confirmPassword: "",
    telefono: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    
    ApiService.signUp({
      email: form.email,
      name: form.nombre,
      password: form.password,
      telefono: form.telefono
    }).then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error("Error fetching event options:", error);
        });

    console.log(form);
  };

  return (
    <Box sx={{ margin:'auto', width:'70%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" mb={2} align="center">Crear Cuenta</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo electrónico"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Nombre"
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirmar contraseña"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Teléfono"
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          {error && <Typography color="error" variant="body2" mt={1}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Crear Cuenta
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SigninPage;