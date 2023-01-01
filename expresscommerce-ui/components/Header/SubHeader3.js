import classes from "./SubHeader3.module.css";
import Link from "next/link";

function SubHeader3(props) {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {props.menus &&
            props.menus.map((element) => (
              <li key={element.code}>
                {" "}
                <Link href={`/category/${element.code}/${element.title}`}>
                  {element.title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}

export default SubHeader3;
