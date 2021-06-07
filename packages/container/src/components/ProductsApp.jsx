import React, { useEffect, useRef } from 'react';
import { mount } from 'products/ProductsApp';
import { useHistory } from 'react-router-dom';

const ProductsApp = () => {
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
      initialPath: history.location.pathname
    });
    history.listen(updateProductsHistory);
  }, []);

  return (
    <div ref={ productsRef }></div>
  );
};

export default ProductsApp;
