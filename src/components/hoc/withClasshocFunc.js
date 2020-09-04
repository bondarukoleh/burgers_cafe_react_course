import React from "react";

const withClasshocFunc = (WrappedComponent, classes) => {
  return props => (
    <div className={classes}>
      <WrappedComponent {...props} />
    </div>
  );
};

export default withClasshocFunc;