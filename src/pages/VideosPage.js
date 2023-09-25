import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Container, Stack, Typography, Box, OutlinedInput, InputAdornment } from '@mui/material';
// components
import { VideosList, VideoFilterSidebar } from '../sections/@dashboard/video';
// ----------------------------------------------------------------------

const baseUrl = "https://alets-flix-api.vercel.app/videos";

// ----------------------------------------------------------------------

export default function VideosPage() {
  const [data, setData] = useState([]);

  const [openFilter, setOpenFilter] = useState(false);

  const [noResults, setNoResults] = useState(false);

  const [searchTerm, setSearchTerm] = useState(''); 

  const [filters, setFilters] = useState({
    destacado: 'Todo',
    category: 'Todo'
  });
  
  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleFilterChange = (destacado, category) => {
    setFilters({ destacado, category });
  };

  const handleFilterByName = (e) => {
    setSearchTerm(e.target.value); // Actualiza el estado solo si se cumple la condición
  };

  useEffect(() => {
    peticionGet();
  }, [searchTerm]); 

  useEffect(() => {
    peticionGet();
  }, [filters]); 


  const peticionGet = async () => {
    try {
      let apiUrl = baseUrl;
      
      const queryParameters = [];
  
      if (filters.destacado !== 'Todo') {
        queryParameters.push(`destacado=${filters.destacado}`);
      }
  
      if (filters.category !== 'Todo') {
        queryParameters.push(`categoria=${filters.category}`);
      }
  
      // if (searchTerm) {
      //   const normalizedSearchTerm = deburr(searchTerm).toLowerCase();
      //   queryParameters.push(`titulo_contains=${normalizedSearchTerm}`); // Cambia 'titulo' por el campo correspondiente en tu API
      // }
  
      if (queryParameters.length > 0) {
        apiUrl += `?${queryParameters.join('&')}`;
      }
  
      const response = await axios.get(apiUrl);
  
      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
  
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
      width: 320,
      boxShadow: theme.customShadows.z8,
    },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
  }));

  

  return (
    <>
      <Helmet>
        <title> AletsFlix: Videos </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          ¿Qué veremos hoy? 😎
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          {/* <Stack>
            <StyledSearch
              value={searchTerm}
              onChange={handleFilterByName}
              placeholder="Buscar video..."
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
            />
          </Stack> */}
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <VideoFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleFilter}
              onCloseFilter={handleFilter}
              onFilterChange={handleFilterChange}
              actualDestacado={filters.destacado}
              actualCategory={filters.category}
            />
          </Stack>
        </Stack>

        {noResults ? (
          <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ textAlign: 'center', mx: 'auto', my: 'auto' }}>
              No se encontraron videos con los criterios seleccionados.
            </Typography>
            <Box
              component="img"
              src="/assets/illustrations/illustration_404.svg"
              sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
            />
        </Box>
        ) : (
          <VideosList videos={data} />
        )}
      </Container>
    </>
  );
}
