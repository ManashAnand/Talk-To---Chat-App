import React, { useContext } from "react";
import styles from "./Search.module.css";
import { useState } from "react";
import { 
  collection, 
  getDocs, 
  query , 
  doc , 
  setDoc, 
  where, 
  updateDoc,
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", username)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
      console.log("working");
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // Isme pahle dekhenge ki dono ka chat pahle se exist karta
    // ha ya nhi agar kare to thik wrna new bana denge
    // dono ka uid ko jod ke ek msg me id banayenge mtlb
    // new collection me jiska id in dono ke uid ka concat hoga
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if(!res.exists()) {
        // tab chat create kar denge 
        // exists firebase method , js method nhi
        await setDoc(doc(db,"chats",combinedId),{messages: []})
      
        // User chat banayenge ab jisme last message ho aur baki sab
        // Basically yha pe document upload kardenge

        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"] : {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".data"]: serverTimestamp()
        })

        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"] : {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".data"]: serverTimestamp()
        })
      
      }      
    } catch (error) {

    }

    setUser(null);
    setUsername("");

  };
  return (
    <>
      <div className={styles.search}>
        <div className={styles.searchForm}>
          <input
            type="text"
            placeholder="Find User"
            value={username}
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {err && <span>User not found !</span>}
        {user && (
          <div className={styles.userChat} onClick={handleSelect}>
            <img src={user.photoURL} alt="Manash"  />
            <div className={styles.userChatInfo}>
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
