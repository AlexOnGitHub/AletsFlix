import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';


// ----------------------------------------------------------------------

export const FILTER_DEST_OPTIONS = [
  { label: 'Todo', value: 'Todo' },
  { label: 'Si', value: true },
  { label: 'No', value: false },
];

export const FILTER_CATEGORY_OPTIONS = [
  { label: 'Todo', value: 'Todo' },
  { label: 'Entretenimiento', value: 'Entretenimiento' },
  { label: 'Video Juegos', value: 'Video Juegos' },
  { label: 'Deportes', value: 'Deportes' },
  { label: 'Noticias', value: 'Noticias' },
  { label: 'Música', value: 'Música' },
  { label: 'Otro', value: 'Otro' },
];

// ----------------------------------------------------------------------


VideoFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  onFilterChange: PropTypes.func,
  actualDestacado: PropTypes.string,
  actualCategory: PropTypes.string,
};

export default function VideoFilterSidebar({ openFilter, onOpenFilter, onCloseFilter, onFilterChange, actualDestacado, actualCategory }) {
  const [destacado, setSelectedDestacado] = useState(actualDestacado || 'Todo');
  const [category, setSelectedCategory] = useState(actualCategory || 'Todo');
  
  useEffect(() => {
    // Cuando se abra la barra de filtros, establece los valores actuales.
    if (openFilter) {
      setSelectedDestacado(actualDestacado);
      setSelectedCategory(actualCategory);
    }
  }, [openFilter, actualDestacado, actualCategory]);

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filtro&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filtro
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Destacado
              </Typography>
              <RadioGroup>
                {FILTER_DEST_OPTIONS.map((item) => (
                  <FormControlLabel 
                    key={item.value} 
                    value={item.value} 
                    control={<Radio />} 
                    label={item.label} 
                    checked={item.value === (destacado === 'true' ? true : destacado === 'false' ? false : 'Todo')}
                    onChange={ (e) => setSelectedDestacado(e.target.value) }
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Categoría
              </Typography>
              <RadioGroup>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel 
                    key={item.value} 
                    value={item.value} 
                    control={<Radio />} 
                    label={item.label} 
                    checked={item.value === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                 />
                ))}
              </RadioGroup>
            </div>

          </Stack>
        </Scrollbar>

        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            startIcon={<Iconify icon="mdi:filter-check-outline" />}
            onClick={() => {
              onFilterChange(destacado, category);
              onCloseFilter();
            }}
          >
            Aplicar Filtros
          </Button>
        </Box>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={() => {
              onFilterChange('Todo', 'Todo');
              onCloseFilter();
            }}
          >
            Eliminar Filtros
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
