import { useState } from "react";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import { socialLinks } from "../../data";
import Tooltip from "@mui/material/Tooltip";
import Donation from "../../Components/donation";
import buyMeCoffee from "../../Images/icons8-coffee-to-go-48.png";
import "./support.css";

const Support = () => {
  //Actions
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="home_three">
      <Sidebar openMenu={openMenu} />
      <div className="home_four">
        <Navbar setOpenMenu={setOpenMenu} />
        <div className="support_one">
          <div className="support_two padding">
            <h2>Support the creator (Follow or donate)</h2>

            <div className="socialLinks">
              <div className="social_one">
                {socialLinks.map((socialLink) => {
                  return (
                    <Tooltip
                      key={socialLink.id}
                      title={socialLink.type}
                      placement="top-end"
                      arrow
                    >
                      <a
                        className="socailLink_href"
                        target={"_blank"}
                        href={socialLink.social}
                      >
                        {socialLink.social.slice(0, 40)}...
                      </a>
                    </Tooltip>
                  );
                })}
                <Donation text={"Donate through bank."} title={"Bank"} />
                <Donation
                  text={"Donate using cryptocurrency."}
                  title={"Cryptocurrency"}
                />
              </div>
              <div className="socialLink_content">
                <main>
                  <p>
                    <strong>Dear Friends and Supporters,</strong>
                  </p>
                  <br />
                  <p>
                    I hope this note finds you well. As you may already know, I
                    am a developer who has been working hard to make a name for
                    myself in the tech industry. Over the past few years, I have
                    dedicated my time and energy to building innovative software
                    solutions that have helped businesses and individuals alike.
                  </p>
                  <br />
                  <p>
                    Unfortunately, my work has recently come to a standstill due
                    to some unforeseen circumstances. My laptop, which is the
                    main tool I use to create and test my software applications,
                    has broken down and is beyond repair. This has left me
                    unable to work on any of my ongoing projects, and has put a
                    serious dent in my ability to provide for myself and my
                    family.
                  </p>
                  <br />
                  <p>
                    In addition to this, I am also facing constant power outages
                    in my area. This makes it even more difficult to work, as I
                    am unable to rely on a consistent power supply to keep my
                    laptop and other devices running.
                  </p>
                  <br />
                  <p>
                    That is why I am reaching out to you today, in the hope that
                    you might be able to help me get back on my feet. Any
                    donations that you can make towards buying me a new laptop
                    and helping me to maintain a constant supply of electricity
                    would be greatly appreciated.
                  </p>
                  <br />
                  <p>
                    I understand that times are tough for everyone, and that
                    many of you may also be struggling to make ends meet.
                    However, I hope that those of you who are able to help will
                    consider doing so. Your support will not only help me to get
                    back to work, but it will also give me the ability to
                    continue making a positive impact on the world through my
                    software development work.
                  </p>
                  <br />
                  <p>
                    <em>
                      {" "}
                      Thank you for taking the time to read this note, and for
                      considering donating to my cause. Your generosity will
                      make a huge difference in my life, and I am forever
                      grateful.
                    </em>
                  </p>
                  <br />
                  <p>Best regards,</p>
                  <br />
                  <p>
                    <strong>Soolaiman Gee.</strong>
                  </p>
                </main>
              </div>
            </div>
          </div>
          <div className="buy_me_coffee">
            <a target={"_blank"} href="https://www.buymeacoffee.com/geeCodes">
              <img src={buyMeCoffee} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
