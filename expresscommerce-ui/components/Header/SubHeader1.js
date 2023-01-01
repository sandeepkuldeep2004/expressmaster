import Logo from './Logo';
import classes from './SubHeader1.module.css';

function SubHeader1() {
  return (
    <div className={classes.subheader}>
      <Logo />
      <span className={classes.signin}>SIGN IN / REGISTER</span>
    </div>
  );
}

export default SubHeader1;