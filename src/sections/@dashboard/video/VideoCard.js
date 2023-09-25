import PropTypes from 'prop-types';
// @mui
import {Box, Card, Typography, Tooltip} from '@mui/material';
import Iconify from '../../../components/iconify';
import getVideoId from '../../../hooks/getVideoId';
// components
import Label from '../../../components/label';

// ----------------------------------------------------------------------

VideoCard.propTypes = {
  video: PropTypes.object,
};

export default function VideoCard({ video }) {
  const { titulo, descripcion, categoria, destacado, url } = video;
  const videoId = getVideoId(url);
  const videoUrl = `https://www.youtube.com/embed/${videoId}`

  return (
    <Card sx={{ minHeight: '390px', maxHeight: '390px', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        {destacado && (
          <Label
            variant="filled"
            color="primary"
            sx={{
              zIndex: 9,
              bottom: 14,
              right: 10,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {'✨Destacado'}
          </Label>
        )}
        
        <iframe
            width="100%"
            height="100%"
            src={videoUrl}
            allowFullScreen
            title={titulo}
            aria-hidden="true"
          />
        
      </Box>
      <Box sx={{flex: '10', display: 'flex', flexDirection: 'column', p: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ overflowWrap: 'break-word', maxWidth: '100%' }}>
            {titulo}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">
           {descripcion}
          </Typography>
        </Box>
      </Box> 
      <Box sx={{ flex: '0', display: 'flex',  justifyContent: 'center', marginBottom:'8px'}}>
        <Tooltip title={'Categoría'}>
          <Label variant='filled' color='primary' sx={{ maxWidth: '70%' }} startIcon={<Iconify icon={'material-symbols:category-outline'} />}>
            {categoria}&nbsp;
          </Label>
        </Tooltip>
      </Box>
    </Card>
  );
}