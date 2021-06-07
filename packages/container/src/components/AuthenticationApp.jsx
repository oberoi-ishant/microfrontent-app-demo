import React, { useEffect, useRef } from 'react';
import { mount } from 'authentication/AuthenticationApp';
import { useHistory } from 'react-router-dom';

const AuthenticationApp = ({ onSignIn }) => {
  const productsRef = useRef(null);
  const history = useHistory();

  // update the container history when child navigates to new route.
  // this callback will be called by child on history.listen.
  const updateContainerHistory = (location) => {
    const { pathname: nextPathnameFromChild } = location;
    if (history.location.pathname !== nextPathnameFromChild) {
      history.push(nextPathnameFromChild);
    }
  };

  useEffect(() => {
    const { updateProductsHistory } = mount(productsRef.current, {
      updateContainerHistory,
      initialPath: history.location.pathname,
      onSignIn
    });
    history.listen(updateProductsHistory);
  }, []);

  return (
    <div ref={ productsRef }></div>
  );
};

export default AuthenticationApp;
