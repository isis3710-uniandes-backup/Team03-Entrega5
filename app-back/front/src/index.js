import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './routes';
import {IntlProvider} from 'react-intl';


const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
  );