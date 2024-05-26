"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGlobalContext } from '@/context/StoreProvider';

function SignUp() {
  const router = useRouter();
  const { addUser } = useGlobalContext();
  const [formData, setFormData] = React.useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
  });
  const [errors, setErrors] = React.useState({
    nombre: false,
    apellido: false,
    email: false,
    contraseña: false,
    form: false, // Nuevo estado para el mensaje general
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { nombre, apellido, email, contraseña } = formData;

    if (!nombre.trim() || !apellido.trim() || !email.trim() || !contraseña.trim()) {
      setErrors((prev) => ({ ...prev, form: true })); // Mostrar el mensaje general
      setErrors((prev) => ({ ...prev, nombre: !nombre.trim(), apellido: !apellido.trim(), email: !email.trim(), contraseña: !contraseña.trim() }));
      return;
    }

    // Validación del email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      return;
    }

    // Validación de la contraseña
    if (contraseña.length < 6) {
      setErrors((prev) => ({ ...prev, contraseña: true }));
      return;
    }

    setErrors((prev) => ({ ...prev, form: false, nombre: false, apellido: false, email: false, contraseña: false }));

    try {
      // Cambia la clave 'contraseña' a 'password' en el objeto newUser
      const newUser = {
        nombre,
        apellido,
        email,
        password: contraseña, // Cambio de 'contraseña' a 'password'
      };

      await addUser(newUser);
      alert('Usuario registrado con éxito');
      router.push('/SignIn');
      router.refresh();
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Error al registrar el usuario');
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar cuenta
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="nombre"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  autoFocus
                  error={errors.nombre}
                  helperText={errors.nombre && 'Por favor, ingresa tu nombre'}
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="family-name"
                  error={errors.apellido}
                  helperText={errors.apellido && 'Por favor, ingresa tu apellido'}
                  value={formData.apellido}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  error={errors.email}
                  helperText={errors.email && 'Por favor, ingresa un correo electrónico válido'}
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contraseña"
                  label="Contraseña"
                  type="password"
                  id="contraseña"
                  autoComplete="new-password"
                  error={errors.contraseña}
                  helperText={errors.contraseña && 'La contraseña debe tener al menos 6 caracteres'}
                  value={formData.contraseña}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  ¿Ya tienes una cuenta? Iniciar sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
