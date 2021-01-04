import React, { useState } from 'react';

const TempScan = () => {
  return <div>Temporary Scan component</div>;
};

export const VaccinationLog = () => {
  const [qrData, setQrData] = useState('');

  if (!qrData || !qrData.length) {
    return (
      <div>
        <TempScan />
      </div>
    );
  }

  return <div>Has data</div>;
};
