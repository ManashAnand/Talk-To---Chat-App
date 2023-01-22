import React from 'react'
import styles from './Chat.module.css';
import Cam from "../../img/cam.jpg"
import Add from "../../img/add.jpg"
import More from "../../img/more.jpg"
import Messages from './Messages';
import Input from './Input';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <>
     <div className={styles.Chat}>
        <div className={styles.chatInfo}>
          <span>{data?.user.displayName}</span>
          <div className={styles.chatIcons}>
            <img className={styles.icon} src={Cam} alt="cam" />
            <img className={styles.icon} src={Add} alt="add" />
            <img className={styles.icon} src={More} alt="more" />
          </div>
        </div>
          <Messages/>
          <Input/>
     </div> 
    </>
  )
}

export default Chat
