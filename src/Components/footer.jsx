import Logo from "./logo";

const Footer = () => {
  return (
    <div className="footer_one">
      <div className="footer_two padding">
        <Logo />
        <form className="footer_four" action="">
          <input type="text" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="footer_three padding">
        <p>© 2021 All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
