import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Profile } from '../../components/Profile/Profile';
import { ScanQRCode } from '../ScanQRCode/ScanQRCode';

const VerifyContainer = styled.div`
  text-align: right;
`;

const QRContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const exUser: Profile = {
  id: 0,
  full_name: 'Hung Phan',
  personal_id: '201761488',
  email: 'hungphan@novahub.vn',
  phone: '0969357824',
  password: '1234454',
  q_r_code: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  profile_url: 'https://i.pravatar.cc/300',
  sex: 'Male',
  birthday: '2021-01-04T22:13:20.595Z',
  address: 'sds dsfg d dsfg dfg ds dfg dg ds d gd',
  created_date: '2021-01-04T22:13:20.595Z',
  approval_date: '2021-01-04T22:13:20.595Z',
  valid: true,
  remind_first_vaccinate_date_time: '2021-01-04T22:13:20.595Z',
  first_vaccinate_date_time: '2021-01-04T22:13:20.595Z',
  first_vaccinate_description: '2021-01-04T22:13:20.595Z',
  remind_second_vaccinate_date_time: '2021-01-04T22:13:20.595Z',
  second_vaccinate_date_time: '2021-01-04T22:13:20.595Z',
  second_vaccinate_description: '2021-01-04T22:13:20.595Z',
  status: 'Registered',
};

export const AccountVerify = () => {
  const [profile, setProfile] = useState<Profile>(exUser);

  const handleScanOther = () => {
    setProfile((null as unknown) as Profile);
  };

  const handleScanQrCode = (result: string) => {
    console.log({ result });
    setProfile(exUser);
  };
  return (
    <div>
      {profile ? (
        <>
          <VerifyContainer>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleScanOther}
            >
              Scan other
            </Button>
            <Profile profile={profile} role="admin" title="Patient Profile" />
          </VerifyContainer>
        </>
      ) : (
        <QRContainer>
          <ScanQRCode
            onScanned={handleScanQrCode}
            size={{ width: 600, height: 600 }}
          />
        </QRContainer>
      )}
    </div>
  );
};
