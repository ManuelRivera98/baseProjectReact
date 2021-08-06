import { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'views/NotFound';
import { Loader, Layout } from 'components';
import { useSelector } from 'react-redux';
import Routes from './routes';

export default function Router() {
  const { roleRoutes = 'public' } = useSelector(({ AppReducer = {} }) => AppReducer);
  return (
    <Suspense fallback={<Loader fullAppLoader />}>
      <Layout>
        <Switch>
          {Routes[roleRoutes].map(({ key, ...routeProps }) => (
            <Route {...routeProps} key={key} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Suspense>
  );
}
