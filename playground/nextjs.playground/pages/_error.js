function Error({statusCode}) {
  const codeError = (code) => <p> There was an error {code} </p>;

  return <h1> Sorry, we have nothing to show you with that request. {statusCode && codeError(statusCode)} </h1>
}

Error.getInitialProps = ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {statusCode};
};

export default Error;