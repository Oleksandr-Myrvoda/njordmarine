import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react';
import storage from '../../../firebaseConfig';
import s from './FileUploader.module.css';

const FileUploader = ({ setImage }) => {
  const [file, setFile] = useState('');
  const [percent, setPercent] = useState(0);

  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    function handleUpload() {
      if (!file) {
        console.log('Please choose a file first!');
        return;
      }

      const storageRef = ref(storage, `/files/${file.name + Date.now()}`);
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
          getDownloadURL(uploadTask.snapshot.ref).then(imageUrl => {
            setImage(imageUrl);
          });
        },
      );
    }
    handleUpload();
  }, [file, setImage]);

  return (
    <>
      <input type="file" accept="image/*" onChange={handleChange} />
      <h3>{percent} %</h3>
      <button className={s.upload}>Upload</button>
    </>
  );
};

export default FileUploader;
