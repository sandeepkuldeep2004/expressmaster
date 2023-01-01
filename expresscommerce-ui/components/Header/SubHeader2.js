import classes from "./SubHeader2.module.css";
import SearchBox from "./SearchBox";
import Location from "./Location";
import Order from "./Order";
import Cart from "./Cart";

function SubHeader2() {
  return (
    <div className={classes.subheader}>
      <SearchBox />
      <div className={classes.floatright}>
        <Location />
        <Order />
        <Cart />
      </div>
    </div>
  );
}

export default SubHeader2;
