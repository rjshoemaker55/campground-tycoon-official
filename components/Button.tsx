import classes from "../css/Button.module.scss";

const Button = (props: any) => {
  if (props.href) {
    return (
      <a href={props.href} className={classes.button}>
        {props.children}
      </a>
    );
  } else if (props.onClick) {
    return (
      <button onClick={props.onClick} className={classes.button}>
        {props.children}
      </button>
    );
  }
};

export default Button;
