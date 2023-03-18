import React from "react";

const SettingsComp = (props) => {
  const { setSettings, settings } = props;
  return (
    <div className="settings_comp_one">
      <div className="settings_comp_two">
        <button
          onClick={() => {
            setSettings("Edit");
          }}
        >
          Edit Profile
        </button>
        <button
          onClick={() => {
            setSettings("Settings");
          }}
        >
          App Settings
        </button>
        <button
          onClick={() => {
            setSettings("Security");
          }}
        >
          Acct Security
        </button>
      </div>
    </div>
  );
};

export default SettingsComp;
