import React from "react";

const SettingsComp = (props) => {
  //Props
  const { setSettings, settings } = props;

  return (
    <div className="settings_comp_one">
      <div className="settings_comp_two">
        <button
          onClick={() => {
            setSettings("Edit");
          }}
          className={`settings_comp_two_button ${
            settings === "Edit" ? "settings_comp_two_btn_isActive" : ""
          }`}
        >
          Edit Profile
        </button>
        <button
          onClick={() => {
            setSettings("Settings");
          }}
          className={`settings_comp_two_button ${
            settings === "Settings" ? "settings_comp_two_btn_isActive" : ""
          }`}
        >
          App Settings
        </button>
        <button
          onClick={() => {
            setSettings("Security");
          }}
          className={`settings_comp_two_button ${
            settings === "Security" ? "settings_comp_two_btn_isActive" : ""
          }`}
        >
          Acct Security
        </button>
      </div>
    </div>
  );
};

export default SettingsComp;
