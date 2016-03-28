import s from './Footer.css';

/**
 * Footer component
 * @return {Component}
 */
export default function Footer() {
  return (
    <div className={s.host}>
      <div>Copyright &copy; {new Date().getFullYear()}</div>
      <div style={{ flex: 1 }}></div>
      <div>Turtles Inc.</div>
    </div>
  );
}
