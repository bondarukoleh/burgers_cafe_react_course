import React from "react";

const withClasshocFunc = (WrappedComponent, classes) => {
  return props => (
    <div className={classes}>
      <WrappedComponent />
    </div>
  );
};

export default withClasshocFunc;