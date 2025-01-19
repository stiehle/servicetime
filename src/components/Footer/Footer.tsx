import "./footer.scss";

type prop = {
  name: string;
};

function Footer({ name }: prop) {
  return (
    <>
      <div className="footer__items">
        <p>{name}</p>
        <a href="http://www.stiehle.de/impressum" target="_blank">
          Impressum
        </a>
        <a href="http://www.stiehle.de/datenschutz" target="_blank">
          Datenschutzerklärung
        </a>
        <a href="http://www.stiehle.de" target="_blank">
          &copy;2025 www.stiehle.de
        </a>
      </div>
    </>
  );
}

export default Footer;
