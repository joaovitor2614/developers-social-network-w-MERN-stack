import React, { useEffect } from 'react'
import useUpload from '../../../hooks/useUpload'
import CircularProgress from '@material-ui/core/CircularProgress';

const Progress = ({ setImgUrl, setFile, file }) => {
    const { url, progress } = useUpload(file);
    useEffect(() => {
        if (url) {
            setImgUrl(url)
            console.log(url)
            setFile(null);
            
        }
    }, [url, setFile])
    return (
        <div>
            <CircularProgress variant="determinate" value={progress} />
        </div>
    )
}

export default Progress
