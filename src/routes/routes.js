import { lazy } from 'react';

const NameView = lazy(() => import('views/NameView/container'));

export default {
  public: [
    {
      path: '/',
      key: 'nameExample',
      component: NameView,
      exact: true,
      title: 'Name Example',
    },
  ],
};
