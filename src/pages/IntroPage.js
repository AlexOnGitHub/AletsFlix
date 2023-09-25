import { Helmet } from 'react-helmet-async';
import { Container, Typography, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title>AletsFlix: Inicio</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        {/* Contenido centrado vertical y horizontalmente */}
        <Typography variant="h4" sx={{ mb: 2 }}>
          Hola,
          bienvenido a mi proyecto AletsFlix.
        </Typography>
        <Typography variant="h6" sx={{ mb: 10, color: 'text.secondary', textAlign: 'center' }}>
          Esta es una aplicación de almacenamiento de videos que simula una plataforma al estilo "Netflix". 
          <br />
          Creada para el proyecto "AluraFlix" de Oracle ONE.
          <br />
          Puedes acceder al codigo de GitHub da click en el siguiente icono:
        </Typography>
        <Link href="https://github.com/AlexOnGitHub/AletsFlix" target="_blank">
          <GitHubIcon sx={{ fontSize: 48, color: 'black' }} />
        </Link>
      </Container>
    </>
  );
}
