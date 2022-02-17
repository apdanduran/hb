import React, { useRef, useState } from 'react';
import Header from './components/Header/Header';
import Links from './components/Links/Links';
import AddLinkPage from './components/AddLinkPage/AddLinkPage'
import { useEffect } from 'react';
import ToastMessage from './components/Toast/ToastMessage.js';
import styles from './components/Toast/ToastMessage.module.css'

let sortVal;
function App() {
  const [addLinkControl, setAddLinkControl] = useState(true);
  const [links, setLink] = useState([])
  const toastRef = useRef();
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [deleteOrAdd, setDeleteOrAdd] = useState("");
  const [tempDeletedName, setTempDeletedName] = useState("");
  const [votedSort, setVotedSort] = useState("lessVoted")

  useEffect(() => {
    var oldItems = JSON.parse(localStorage.getItem('links'));
    if (oldItems) {
      setLink([...oldItems])
    }
  }, [])


  useEffect(() => {
    sortVal = votedSort;
    let tempLink = JSON.parse(localStorage.getItem('links'));
    if (tempLink) {
      tempLink.sort(sortByTime);
      tempLink.sort(compareVotes);
      console.log('tempLink :>> ', tempLink);
      setLink([...tempLink]);
    }

  }, [votedSort])

  function compareVotes(a, b) {
    if (sortVal === "mostVoted") {
      if (b.vote < a.vote) {
        return -1;
      }
      if (b.vote > a.vote) {
        return 1;
      }
    } else if (sortVal === "lessVoted") {
      if (a.vote < b.vote) {
        return -1;
      }
      if (a.vote > b.vote) {
        return 1;
      }
    }
    return 0;

  }

  function sortByTime(a, b) {
    if (sortVal === "lessVoted") {
      return new Date(a.date) - new Date(b.date)
    } else {
      return new Date(b.date) - new Date(a.date)
    }
  }

  function sortsFunc(tempLinks) {
    tempLinks.sort(sortByTime);
    tempLinks.sort(compareVotes);
    setLink(tempLinks);
    localStorage.setItem('links', JSON.stringify(links));
  }

  useEffect(() => {
    if (showToastMessage) {
      setAddLinkControl(true);
      toastRef.current.className = styles.show
      setTimeout(() => {
        toastRef.current.className = toastRef.current.className.replace(styles.show, "");
        setShowToastMessage(false);
        setLinkName("");
        setLinkUrl("");
      }, 1000);
    }
  }, [showToastMessage])


  return (
    <div className="App">
      <Header />
      <ToastMessage content={`${deleteOrAdd === "added" ? linkName + " added" : tempDeletedName + " deleted"}`} id={styles.toastMessage} toastRef={toastRef} />
      {
        addLinkControl
          ? < Links setVotedSort={setVotedSort} setTempDeletedName={setTempDeletedName} setDeleteOrAdd={setDeleteOrAdd} setLinkName={setLinkName} sortsFunc={sortsFunc} setAddLinkControl={setAddLinkControl} showToastMessage={showToastMessage} setShowToastMessage={setShowToastMessage} setLink={setLink} links={links} />
          : <AddLinkPage setDeleteOrAdd={setDeleteOrAdd} setLinkName={setLinkName} setLinkUrl={setLinkUrl} showToastMessage={showToastMessage} setShowToastMessage={setShowToastMessage} linkName={linkName} linkUrl={linkUrl} sortsFunc={sortsFunc} setAddLinkControl={setAddLinkControl} setLink={setLink} links={links} />
      }
    </div>
  );
}

export default App;
