import almacena from '../../assets/almacena.svg';
import vende from '../../assets/vende.svg'; 
import estadistica from '../../assets/estadistica.svg';

export const homeObjeOne = {
  id: 'comercializacion', 
  lightBg: false, 
  lightText: true, 
  lightTextDesc: true, 
  topLine: 'Comercialización', 
  headline: 'Vende tus productos', 
  description: 'Con PachaStore podrás ofrecer tus productos agrícolas ,ya sea frutas verduras o granos directo al consumidor .', 
  buttonLabel: 'Get started', 
  imgStart: false, 
  img: almacena, 
  alt: 'Car', 
  dark: true, 
  primary: true, 
  darkText: false,  
};

export const homeObjeTwo = {
  id: 'equilibrio', 
  lightBg: true, 
  lightText: false, 
  lightTextDesc: false, 
  topLine: 'Punto de Equilibrio', 
  headline: 'Analiza el mercado', 
  description: 'Con un análisis de oferta y demanda podrás ofrecer tu producto al mejor precio.', 
  buttonLabel: 'Learn more', 
  imgStart: true, 
  img: estadistica, 
  alt: 'Piggybank', 
  dark: false, 
  primary: false, 
  darkText: true, 
};


export const homeObjeThree = {
  id: 'ganancias', 
  lightBg: false, 
  lightText: true, 
  lightTextDesc: true, 
  topLine: 'Maximiza tus ganancias', 
  headline: 'Visualiza tus ganancias y pedidos', 
  description: 'Obtén información inmediata de los pedidos y las ganancias que se registran automáticamente además de un pago seguro en su cuenta bancaria.',
  buttonLabel: 'Start now', 
  imgStart: false, 
  img: vende, 
  alt: 'Secure data', 
  dark: true, 
  primary: true, 
  darkText: false, 
};