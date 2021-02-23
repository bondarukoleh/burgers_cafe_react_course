import User from '../../components/User'

function AuthPage(props) {
  return <div>
    <h1>This is Auth User page. User is {props.authUser}</h1>
    <User name={'Oleh'} age={30} />
  </div>
}

AuthPage.getInitialProps = () => {
  return new Promise(r => setTimeout(() => {
    //'This is my data from DB fetched during prerendering on server side'
    r({authUser: 'Oleh (Auth)'});
  }, 2000));
}
export default AuthPage
