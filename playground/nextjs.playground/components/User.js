import style from './User.module.css'

const User = (props) => {
  return <div className={style.User}>
    <h1>{props.name}</h1>
    <p>Age: {props.age}</p>
  </div>
};

export default User;