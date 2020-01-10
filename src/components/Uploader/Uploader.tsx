import React, { useEffect, ReactElement } from 'react'
import useFirebaseUpload from './useFirebaseUpload'
import { IonProgressBar } from '@ionic/react'

const Uploader: React.FC = (props: any): ReactElement => {
  const [
    { data, isLoading, isError, progress },
    setDirName,
    setFileData,
  ] = useFirebaseUpload()

  const onChangeHandler = (e: any): void => {
    if (props.dir) setDirName(props.dir)
    setFileData(e.target.files[0])
  }

  useEffect(() => {
    props.proc(data)
  }, [data])

  return (
    <div>
      {isError && <div>ERROR: {isError.message}</div>}
      {isLoading && progress && (
        <IonProgressBar
          style={{ width: '10%' }}
          value={progress.value}
        ></IonProgressBar>
      )}
      <input
        type="file"
        onChange={onChangeHandler}
        style={{ padding: '20px 0' }}
      />
      {data && (
        <a href={data.downloadUrl} target="_blank">
          {data.metaData.name}
        </a>
      )}
    </div>
  )
}

export default Uploader
