import React, { useRef } from "react";
import styles from "./Message.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useEffect } from "react";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message])

  return (
    // {`${styles.description} ${styles.yellow}`}
    <div ref={ref}
      className={`${styles.message} ${
        message.senderId === currentUser.uid && styles.owner
      }`}
    >
      <div className={styles.messageInfo}>
        <img
          className={styles.imag}
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="Manash"
        />
        <span className={styles.Span}>just now</span>
      </div>

      <div className={styles.messageContent}>
        <p className={styles.P}>{message.text}</p>
     { message.img &&  <img src={message.img} className={styles.sendImgs} alt="" />}
      </div>
    </div>
  );
};

export default Message;
