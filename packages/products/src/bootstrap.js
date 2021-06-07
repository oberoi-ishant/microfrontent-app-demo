import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory, createMemoryHistory } from 'history';
import App from './App';

const mount = (el, { defaultHistory, updateContainerHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });
  ReactDOM.render(
    <App history={ history } />,
    el
  );

  // update the container history when child navigates to new route
  updateContainerHistory && history.listen(updateContainerHistory);

  return {
    // update the history in products app when container nagivates to new route.
    // this will be called by container on history.listen
    updateProductsHistory(location) {
      const { pathname: nextPathFromContainer } = location;
      if (history.location.pathname !== nextPathFromContainer) {
        history.push(nextPathFromContainer);
      }
    }
  }
};

const environment = process.env.NODE_ENV;
// if (environment === 'development') {
  const localEl = document.getElementById('_local_products_');
  if (localEl) {
    mount(localEl, {
      // Standlone mode use memoryHistory
      defaultHistory: createBrowserHistory()
    });
  }
// }

export {
  mount
};
