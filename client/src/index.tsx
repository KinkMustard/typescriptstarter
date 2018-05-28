import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';
import { EnthusiasmAction } from './actions/index';

import './index.css';

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://192.168.1.97:5000/graphql'
      : '/'
});

const store = createStore<StoreState, EnthusiasmAction, any, any>(enthusiasm, {
  enthusiasmLevel: 0,
  languageName: 'TypeScript'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Hello />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
