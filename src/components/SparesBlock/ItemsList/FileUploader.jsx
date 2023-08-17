import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import storage from '../../../services/firebaseConfig';
import s from './FileUploader.module.css';

const FileUploader = ({ uploadData }) => {
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);

  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  function handleUpload() {
    if (!file) {
      uploadData();
      // console.log('Please choose a file first!');
      return;
    }

    const storageRef = ref(storage, `/files/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );

        // update progress
        setPercent(percent);
      },
      err => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref)
          .then(imageUrl => {
            uploadData(imageUrl);
          })
          .finally(() => {
            setFile(null);
            setPercent(0);
          });
      },
    );
  }

  return (
    <>
      <input type="file" accept="image/*" onChange={handleChange} />
      {/* file || input */}
      <h3>{percent} %</h3>
      <button className={s.upload} type="button" onClick={() => handleUpload()}>
        Upload
      </button>
    </>
  );
};

export default FileUploader;
