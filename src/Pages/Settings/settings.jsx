import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "./settings.css";
import { useState } from "react";
import SettingsComp from "../../Components/settingsComp";
import NavbarPic from "../../Images/movieLab Navbar Pic.jpg";

const Setting = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [settings, setSettings] = useState("Edit");
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);

  const Edit = () => {
    return (
      <div className="settings_gen padding">
        <div className="settings_edit_one">
          <h2>Edit Profile</h2>
          <form className="settings_edit_form" action="">
            <label htmlFor="img">
              <img src={NavbarPic} alt="" />
              <input
                className="settings_edit_input"
                type="file"
                name=""
                id="img"
              />
              <button id="img">Change</button>
            </label>
            <div className="update_profile_settings">
              <div className="update_profile_div">
                <label htmlFor="username">
                  Username
                  <input type="text" />
                </label>
                <label htmlFor="username">
                  Email
                  <input type="email" />
                </label>
              </div>
              <div className="update_profile_div">
                <label htmlFor="username">
                  Old Password
                  <input type="text" />
                </label>
                <label htmlFor="username">
                  New Password
                  <input type="text" />
                </label>
              </div>
            </div>
            <div className="btn_settings_disable">
              <button disabled={true} type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const Settings = () => {
    return (
      <div className="settings_gen padding">
        <div className="settings_edit_one">
          <h2>App Settings</h2>
          <div className="settings_settings_one">
            <div className="settings_settings_two">
              <div className="settings_settings_three">
                <h2>App Theme</h2>
                <p>switch app theme from dark mode to light mode</p>
              </div>
              <div
                onClick={() => {
                  setToggle((prev) => !prev);
                }}
                className="settings_settings_four"
              >
                <div
                  className={`settings_settings_five ${
                    toggle ? "settings_settings_five_active" : ""
                  }`}
                ></div>
              </div>
            </div>
            <div className="settings_settings_two">
              <div className="settings_settings_three">
                <h2>Enable Push Notification</h2>
                <p>get notification when an activity occur in your account.</p>
              </div>
              <div
                onClick={() => {
                  setToggle3((prev) => !prev);
                }}
                className="settings_settings_four"
              >
                <div
                  className={`settings_settings_five ${
                    toggle3 ? "settings_settings_five_active" : ""
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Security = () => {
    return (
      <div className="settings_gen padding">
        <div className="settings_edit_one">
          <h2>Security</h2>
          <div className="settings_settings_two">
            <div className="settings_settings_three">
              <h2>Enable 2FA</h2>
              <p>
                you will get an authentication code before logging your account.
              </p>
            </div>
            <div
              onClick={() => {
                setToggle2((prev) => !prev);
              }}
              className="settings_settings_four"
            >
              <div
                className={`settings_settings_five ${
                  toggle2 ? "settings_settings_five_active" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="home_three">
      <Sidebar openMenu={openMenu} />
      <div className="home_four">
        <Navbar setOpenMenu={setOpenMenu} />
        <div className="settings_one">
          <div className="settings_two padding">
            <SettingsComp setSettings={setSettings} />
          </div>
          <div className="settings_three">
            <div className="settings_four">
              {settings == "Edit"
                ? Edit()
                : settings == "Settings"
                ? Settings()
                : Security()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
