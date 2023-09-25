import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
// import { useTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Tooltip,
  Modal,
  TextField,
  Box,
  InputLabel,
  Switch,
  FormControlLabel,
  Select,
  FormControl
} from '@mui/material';
// @mui-icons
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
// helper
import axios from 'axios';
import { faker } from '@faker-js/faker';
import getVideoId from "../hooks/getVideoId"
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { VideosListHead, VideosListToolbar } from '../sections/@dashboard/adminvideo';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'titulo', label: 'Ttitulo', alignRight: false },
  { id: 'descripcion', label: 'Descripción', alignRight: false },
  { id: 'categoria', label: 'Categoría', alignRight: false },
  { id: 'destacado', label: 'Destacado', alignRight: false },
  { id: 'url', label: 'URL', alignRight: false },
  { id: '' },
];

const baseUrl = "https://alets-flix-api.vercel.app/videos";

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.titulo.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function VideoPage() {
  const theme = useTheme();

  const useStyles = makeStyles({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      borderRadius: '2%',
      boxShadow: theme.shadows[5],
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(3)}px`,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
    },
    icons: {
      cursor: 'pointer',
    },
    inputMaterial: {
      width: '100%',
    },
  });
  
  const styles = useStyles();
  
  const [data, setData] = useState([]);

  const [videoSelected, setVideoSelected] = useState({
    id: faker.datatype.uuid(),
    titulo: "",
    descripcion: "",
    categoria: '',
    destacado: null,
    url: ""
  });

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('titulo');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [modalInsert, setModalInsert] = useState(false);

  const [modalUpdate, setModalUpdate] = useState(false);

  const [modalDelete, setModalDelete] = useState(false);

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    if (type === "checkbox") {
      setVideoSelected((prevState) => ({
        ...prevState,
        [name]: checked, // Utiliza el valor del interruptor (checked) para destacado
      }));
    } else if (name === "categoria") { // Agregar este caso para el Select
      setVideoSelected((prevState) => ({
        ...prevState,
        [name]: value, // Actualiza 'categoria' con el valor seleccionado del Select
      }));
    } else {
      setVideoSelected((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const peticionPost=async()=>{
    await axios.post(baseUrl, videoSelected)
    .then(response=>{
      setData(data.concat(response.data));
      handleModalInsert();
    }).catch(error=>{
      console.log(error);
    })
  }
  
  const peticionPut = async() => {
    await axios.put(`${baseUrl}/${videoSelected.id}`, videoSelected)
    .then(response=>{
      const newData = data;
      newData.forEach(video => {
        if(video.id===videoSelected.id){
          video.titulo = videoSelected.titulo;
          video.descripcion = videoSelected.descripcion;
          video.categoria = videoSelected.categoria;
          video.destacado = videoSelected.destacado;
          video.url = videoSelected.url;
        }
      });
      setData(newData);
      handleModalUpdate();
    }).catch(error=>{
      console.log(error);
    });
  };

  const peticionDelete = async() => {
    await axios.delete(`${baseUrl}/${videoSelected.id}`)
    .then(response=>{
      const newData = data;
      newData.forEach(video => {
        setData(data.filter(video=>video.id!==videoSelected.id));
      });
      handleModalDelete();
    }).catch(error=>{
      console.log(error);
    });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const selectVideo=(video, option)=>{
    setVideoSelected(video);
    if (option === "Editar") {
      handleModalUpdate();
    } else {
        handleModalDelete();
    }
  };


 // ----------------------------------------------------------------------

  const handleOpenMenu = (event, data) => {
    setOpen(event.currentTarget);
    setVideoSelected(data);
  };

  const handleModalInsert = () => {
    setModalInsert(!modalInsert);
  }
  
  const handleModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  }

  const handleModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  const handleCloseMenu = () => {
    setOpen(null);
  };

// ----------------------------------------------------------------------

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.titulo);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, titulo) => {
    const selectedIndex = selected.indexOf(titulo);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, titulo);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredVideos = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredVideos.length && !!filterName;

  const bodyNewVideo = (
    <Box className={styles.modal}>
        <Typography variant="h4" gutterBottom>
              Agregar Nuevo Video
        </Typography>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 , width: '100%'}}>
          <TextField onChange={handleChange} name="titulo" className={styles.inputMaterial}  label={"Titulo"} inputProps={{ maxLength: 50 }} helperText={`Máximo 50 caracteres`} required/>
          <TextField onChange={handleChange} name="descripcion" className={styles.inputMaterial}  label={"Descripción"} inputProps={{ maxLength: 160 }} helperText={`Máximo 160 caracteres`}/>
          <FormControl fullWidth>
            <InputLabel name="categoria" required>Categoría</InputLabel>
            <Select
              labelId="categoria"
              id="categoria"
              name="categoria"
              value={'' || videoSelected.categoria}
              onChange={handleChange}
            >
              <MenuItem value={'Entretenimiento'}>Entretenimiento</MenuItem>
              <MenuItem value={'Video Juegos'}>Video Juegos</MenuItem>
              <MenuItem value={'Deportes'}>Deportes</MenuItem>
              <MenuItem value={'Noticias'}>Noticias</MenuItem>
              <MenuItem value={'Música'}>Música</MenuItem>
              <MenuItem value={'Otro'}>Otro</MenuItem>
            </Select>
          </FormControl>
          <TextField onChange={handleChange} name="url" className={styles.inputMaterial}   label={"URL"} required/>
          <FormControlLabel onChange={handleChange} name="destacado" control={<Switch defaultChecked={false} />} label="Destacado" />        
        </Box>      
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button onClick={()=> peticionPost()} variant="contained" startIcon={<SaveIcon />} >
              Guardar
            </Button>
            <Button onClick={() => handleModalInsert()} variant="outlined" endIcon={<CancelIcon />}>
              Cancelar
            </Button>
          </Stack>
        </Box>
    </Box>
  );

  const bodyEditVideo = (
    <Box className={styles.modal}>
        <Typography variant="h4" gutterBottom>
              Editar Video
        </Typography>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 , width: '100%'}}>
          <TextField onChange={handleChange} name="titulo" className={styles.inputMaterial}  label={"Titulo"} value={videoSelected&&videoSelected.titulo} inputProps={{ maxLength: 50 }} helperText={`Máximo 50 caracteres`} required/>
          <TextField onChange={handleChange} name="descripcion" className={styles.inputMaterial}  label={"Descripción"} value={videoSelected&&videoSelected.descripcion} inputProps={{ maxLength: 160 }} helperText={`Máximo 160 caracteres`} />
          <FormControl fullWidth>
            <InputLabel name="categoria" required>Categoría</InputLabel>
            <Select
              labelId="categoria"
              id="categoria"
              name="categoria"
              value={videoSelected&&videoSelected.categoria}
              onChange={handleChange}
            >
              <MenuItem value={'Entretenimiento'}>Entretenimiento</MenuItem>
              <MenuItem value={'Video Juegos'}>Video Juegos</MenuItem>
              <MenuItem value={'Deportes'}>Deportes</MenuItem>
              <MenuItem value={'Noticias'}>Noticias</MenuItem>
              <MenuItem value={'Música'}>Música</MenuItem>
              <MenuItem value={'Otro'}>Otro</MenuItem>
            </Select>
          </FormControl>
          <TextField onChange={handleChange} name="url" className={styles.inputMaterial} label={"URL"} value={videoSelected.url} required/>
          <FormControlLabel onChange={handleChange} name="destacado" control={<Switch defaultChecked={videoSelected&&videoSelected.destacado} />} label="Destacado"/>        
        </Box>      
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button onClick={()=> peticionPut()} variant="contained" startIcon={<SaveIcon />} >
              Guardar Cambios
            </Button>
            <Button onClick={() => handleModalUpdate()} variant="outlined" endIcon={<CancelIcon />}>
              Cancelar
            </Button>
          </Stack>
        </Box>
    </Box>
  );

  const bodyDelete = (
    <Box className={styles.modal} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 , width: '100%'}} >
        <Typography variant="h6" sx={{ p: 2, textAlign: 'center'}} gutterBottom>
              Estas seguro que deseas eliminar el video: {videoSelected.titulo}?
        </Typography>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => peticionDelete()} sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                Eliminar
            </Button>
            <Button onClick={() => handleModalDelete()} variant="contained" endIcon={<CancelIcon />}>
              Cancelar
            </Button>
          </Stack>
        </Box>
    </Box>
  );

  return (
    <>
      <Helmet>
        <title> AletsFlix: Administrar Videos </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Videos
          </Typography>
          <Button onClick={() => handleModalInsert()} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nuevo Video
          </Button>
          <Modal
            open={modalInsert}
            onClose={handleModalInsert}
          >
            {bodyNewVideo}
          </Modal>
          <Modal
          open={modalUpdate}
          onClose={handleModalUpdate}
          >
            {bodyEditVideo}
          </Modal>      
          <Modal
            open={modalDelete}
            onClose={handleModalDelete}
          >
              {bodyDelete}
          </Modal>               
        </Stack>

        <Card>
          <VideosListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <VideosListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredVideos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, titulo, descripcion, categoria, destacado, url } = row;
                    const selectedVideo = selected.indexOf(titulo) !== -1;
                    const videoId = getVideoId(url);
                  

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedVideo} >
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedVideo} onChange={(event) => handleClick(event, titulo)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar variant="rounded" alt={titulo} src={`https://img.youtube.com/vi/${videoId}/default.jpg`} />
                            <Typography variant="subtitle2" noWrap>
                              {titulo}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                          <Tooltip title={descripcion} arrow>
                            <div style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {descripcion}
                            </div>
                          </Tooltip>
                        </TableCell>

                        <TableCell align="left">{categoria}</TableCell>

                        <TableCell align="left">
                          <Label color={destacado ? 'success' : 'error'}>
                            {destacado ? 'Yes' : 'No'}
                          </Label>
                        </TableCell>

                        <TableCell align="left">
                          <Tooltip title={url} arrow>
                            <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              <a href={url} target="_blank" rel="noopener noreferrer">
                                {url}
                              </a>
                            </div>
                          </Tooltip>
                        </TableCell>

                        <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            No encontrado 😿
                          </Typography>

                          <Typography variant="body2">
                            No se encontraron resultados para &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Intente comprobar si hay errores ortográficos o utilice palabras completas..
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}

                <Popover
                        open={Boolean(open)}
                        anchorEl={open}
                        onClose={handleCloseMenu}
                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        PaperProps={{
                          sx: {
                            p: 1,
                            width: 140,
                            '& .MuiMenuItem-root': {
                              px: 1,
                              typography: 'body2',
                              borderRadius: 0.75,
                            },
                          },
                        }}
                      >
                        <MenuItem onClick={ (event) => selectVideo(videoSelected, "Editar")} >
                          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                            Editar
                        </MenuItem>

                        <MenuItem 
                          onClick={ (event) => selectVideo(videoSelected, "Eliminar")}
                          sx={{ color: 'error.main' }}
                        >
                          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                            Eliminar
                        </MenuItem>
                </Popover>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      
    </>
  );
}
