import Logo from "./logo";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";

const ContactCreator = () => {
  //All States
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    //EmailJS configuration
    emailjs
      .sendForm(
        "service_82458w5",
        "template_pzjm0ba",
        form.current,
        "8O1myACtmeotPt_AL"
      )
      .then(
        (result) => {
          toast.success("Message Sent");
        },
        (error) => {
          toast.error(error.text);
        }
      );
  };
  return (
    <div className="contactCreator_one">
      <Toaster />
      <form
        onSubmit={sendEmail}
        ref={form}
        className="contactCreator_form"
        action=""
      >
        <div className="contactCreator_head">
          <h2>Contact me.</h2>
          <Logo />
        </div>

        <div className="contactCreator_input">
          <div className="contactCreator_input_sub">
            <label className="contactCreator_input_sub_label" htmlFor="">
              Name
              <input name="name" type="text" />
            </label>
            <label className="contactCreator_input_sub_label" htmlFor="">
              SurName
              <input name="surName" type="text" />
            </label>
          </div>
          <div className="review_label_div">
            <label className="contactCreator_input_sub_label" htmlFor="email">
              Email
              <input type="email" name="email" id="email" />
            </label>
            <label className="review_textArea" htmlFor="">
              Message
              <textarea name="message" id="" cols="30" rows="10"></textarea>
            </label>
          </div>
        </div>
        <button className="sendMessage_button_review" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactCreator;
