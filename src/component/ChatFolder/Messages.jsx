import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { db } from '../../firebase';
import Message from './Message'
import styles from './Messages.module.css'

const Messages = () => {
 const [messages,setmessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db,"chats",data.chatId), (doc) => {
        doc.exists() && setmessages(doc.data().messages)
    })

    return () => {
      unsub();
    }
  },[data.chatId])


  return (
    <>
      <div className={styles.messages}>
        {
          messages.map( m => {
            return(
              <Message message = {m} key={m.id}/>
            )
          })
        }
    
      </div>
    </>
  )
}

export default Messages
