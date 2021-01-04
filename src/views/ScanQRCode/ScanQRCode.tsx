import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

export const ScanQRCode = () => {
  let [result, setResult] = useState(null);

  function handleScan(data: any){
    console.log(data);
    if (data) {
      setResult(data)
    }
  }

  function handleError(err: any){
    console.error(err)
  }

  const previewStyle = {
    height: 240,
    width: 320,
  }
  const delay = 300;

  return (
    <div>
      <h3>Scan QR Code</h3>
      <div>
        <QrReader
          delay={delay}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
        />
      </div>
      <div >{result}</div>
    </div>
  
  );

};
