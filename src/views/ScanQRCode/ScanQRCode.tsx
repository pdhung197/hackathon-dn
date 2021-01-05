import React, { useEffect, useState } from 'react';
import QrReader from 'react-qr-reader';

type ScanQRCodeProps = {
  onScanned?: (result: string) => void;
  size?: {
    width: number;
    height: number;
  };
};

export const ScanQRCode = ({ onScanned, size }: ScanQRCodeProps) => {
  let [result, setResult] = useState<string>((null as unknown) as string);

  function handleScan(data: any) {
    if (data) {
      setResult(data);
    }
  }

  function handleError(err: any) {
    console.error(err);
  }

  const previewStyle = {
    height: size?.height || 300,
    width: size?.width || 300,
  };

  const delay = 200;

  useEffect(() => {
    if (result && onScanned) {
      onScanned((result || '').split('=').pop() || '');
    }
  }, [onScanned, result]);

  return (
    <QrReader
      delay={delay}
      onError={handleError}
      onScan={handleScan}
      style={previewStyle}
    />
  );
};
