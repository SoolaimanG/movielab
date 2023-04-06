import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "./settings.css";
import { useEffect, useState } from "react";
import SettingsComp from "../../Components/settingsComp";
import NavbarPic from "../../Images/movieLab Navbar Pic.jpg";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { SelectedAll } from "../../Redux/allSlice";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../Logic/firebase";
import { toast, Toaster } from "react-hot-toast";
import { updatePassword } from "firebase/auth";
import { auth } from "../../Logic/firebase";

const Setting = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [settings, setSettings] = useState("Edit");
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [match, setMatch] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userNameCheckbox, setUserNameCheckbox] = useState(false);
  const [good, setGood] = useState(true);
  const uid = useSelector(SelectedAll).uid;
  const [ImageURL, setImageURL] = useState("");

  //* Document Ref
  const docRef = doc(db, "usersInfo", uid);
  const SettingsRef = doc(db, "userSettings", uid);
  const user = auth.currentUser;

  //UpdateIMG
  const updateIMG = async () => {
    const storageRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            toast.promise("Upload Paused");
            break;
          case "running":
            console.log("Uploading...");
            break;
          default:
            break;
        }
      },
      (error) => {
        toast.error("Something went wrong");
      },
      () => {
        try {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateDoc(docRef, {
              photoURL: downloadURL,
            });
            toast.success("Upload complete");
          });
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    );
  };

  //Getting Info for users that logging through Google
  useEffect(() => {
    const getDataFromFireBase = async () => {
      const docSnap = await getDoc(docRef);
      const settingsSnap = await getDoc(SettingsRef);

      //Getting The Notification Condition
      const { enableNotifications } = settingsSnap.data();
      setToggle3(enableNotifications);

      //Setting User Info
      const { displayName, photoURL, email } = docSnap.data();
      setPhotoURL(photoURL);
      setDisplayName(displayName);
      setEmail(email !== undefined ? email : "");
    };

    getDataFromFireBase();
  }, []);

  useEffect(() => {
    //REGGEX
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const numbers = /[0-9]/;

    const testSpecial = specialCharacters.test(confirmation);
    const testUppercase = upperCase.test(confirmation);
    const testLowercase = lowerCase.test(confirmation);
    const testNumber = numbers.test(confirmation);
    const testLength = confirmation.length >= 8;

    //Also for userName
    const userNameCheck = userName.length > 2;
    setUserNameCheckbox(userNameCheck);

    const TRUE =
      testSpecial && testUppercase && testLowercase && testNumber && testLength;

    TRUE ? setMatch(password === confirmation) : setMatch(false);

    //IS BUTTON TO BE DISABLED (TRUE or FALSE)
    if (TRUE || userNameCheck) {
      setGood(true);
    } else {
      setGood(false);
    }
  }, [password, confirmation, userName]);

  //Updating User Info
  const updateUserInfo = async (e) => {
    e.preventDefault();
    userNameCheckbox &&
      (await updateDoc(docRef, {
        displayName: userName,
      }).then(() => {
        updatePassword(user, password)
          .then(() => {
            toast.success("Changes Apply");
          })
          .catch((error) => {
            toast.error("Something went wrong..");
          });
      }));
  };

  //Enabling Notification
  const notificationEnabled = async () => {
    await updateDoc(SettingsRef, {
      enableNotifications: !toggle3,
    })
      .then(() => {
        toast.success("Changes Applied..");
      })
      .catch((err) => {
        toast.error("Something went wrong...");
      });
  };

  const Edit = () => {
    //SubmitHandle
    const submitHandle = (e) => {
      e.preventDefault();
    };
    return (
      <div className="settings_gen padding">
        <div className="settings_edit_one">
          <h2>Edit Profile</h2>
          <form
            onSubmit={submitHandle}
            className="settings_edit_form"
            action=""
          >
            <label htmlFor="img">
              <img src={photoURL !== "" ? photoURL : NavbarPic} alt="" />
              <input
                className="settings_edit_input"
                type="file"
                name=""
                id="img"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <button
                disabled={progress > 0 && progress < 100}
                type="button"
                onClick={updateIMG}
              >
                Change
              </button>
            </label>
            <div className="update_profile_settings">
              <div className="update_profile_div">
                <label htmlFor="username">
                  Username
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={displayName}
                    type="text"
                  />
                </label>
                <label htmlFor="username">
                  Email
                  <input
                    value={email}
                    autoComplete="true"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={email.slice(0, 14) + "..."}
                    type="email"
                  />
                </label>
              </div>
              <div className="update_profile_div">
                <label htmlFor="username">
                  New Password
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="@MovieLab1"
                    type="text"
                  />
                </label>
                <label htmlFor="username">
                  Confirm Password
                  <input
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    placeholder="@MovieLab1"
                    type="text"
                  />
                </label>
              </div>
            </div>
            <div className="btn_settings_disable">
              <button onClick={updateUserInfo} disabled={!good} type="submit">
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
                <h2>Send Updates</h2>
                <p>if any newer update is available you will be notify.</p>
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
                  setToggle3(!toggle3);
                  notificationEnabled();
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
      <Toaster />
      <Sidebar openMenu={openMenu} />
      <div className="home_four">
        <Navbar setOpenMenu={setOpenMenu} />
        <div className="settings_one">
          <div className="settings_two padding">
            <SettingsComp setSettings={setSettings} settings={settings} />
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
