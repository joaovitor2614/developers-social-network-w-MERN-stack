import { useState, useEffect } from 'react'
import projectStorage from '../firebase/firebase'

const useUpload = (file) => {
    const [progress, setProgress] = useState(0)
    const [url, setUrl] = useState(null)
  const storageRef = projectStorage.ref(file.name)
  useEffect(() => {
       storageRef.put(file).on('state_changed', (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage)

      }, (err) => {
          console.log(err)
      }, async () => {
          const url = await storageRef.getDownloadURL();
          setUrl(url)
      })
  }, [file]);
  return { progress, url }
}

export default useUpload