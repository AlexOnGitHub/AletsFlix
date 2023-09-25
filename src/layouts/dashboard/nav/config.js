// component
import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'Inicio',
  //   path: '/dashboard/app',
  //   icon: icon('ic_home'),
  // },
  {
    title: 'Administrar videos',
    path: '/dashboard/user',
    icon: icon('ic_admin'),
  },
  {
    title: 'Videos',
    path: '/dashboard/products',
    icon: icon('ic_video'),
  },
  {
    title: 'Noticias',
    path: '/dashboard/blog',
    icon: icon('ic_news'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
