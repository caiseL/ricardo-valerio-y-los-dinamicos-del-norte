import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { ApiService } from '../services/api.service'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('CLIENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Aquí iría la lógica de autenticación real
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }
    ApiService.login({
          email: email,
          password: password,
          type: type
        }).then((response) => {
              console.log(response)
             localStorage.setItem("accessToken", (response["accessToken"]));
              window.location.href = "/client/catalog";
            })
            .catch((error) => {
              console.error("Eror while sign in:", error);
            });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" mb={2} align="center">Iniciar Sesión</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Link href="/signin">Registrate como cliente</Link>
          {error && <Typography color="error" variant="body2" mt={1}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Ingresar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
