import { Route, IndexRoute } from 'react-router';
import App from '../containers/app';
import TurtleList from './turtles/TurtleList';
import TurtleAdd from './turtles/TurtleAdd';
import TurtleDetail from './turtles/TurtleDetail';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={TurtleList} />
    <Route path="add" component={TurtleAdd} />
    <Route path="turtle/:id" component={TurtleDetail} />
  </Route>
);

export default routes;
