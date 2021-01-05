import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Profile } from '../../components/Profile/Profile';
import { ProfileModel, ProfileStatus } from '../../helpers/models/Patient';
import { getPatient } from '../../utils/api/patient/getPatient';
import { updatePatientStatus } from '../../utils/api/patient/updatePatientStatus';
import { ScanQRCode } from '../ScanQRCode/ScanQRCode';

const VerifyContainer = styled.div`
  text-align: right;
`;

const QRContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const exUser: ProfileModel = {
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
  status: 'FinishFirstTime',
};

export const AccountVerify = () => {
  const userRole = 'admin';
  const [profile, setProfile] = useState<ProfileModel>(
    (null as unknown) as ProfileModel,
  );

  const handleScanOther = () => {
    setProfile((null as unknown) as ProfileModel);
  };

  const handleScanQrCode = async (result: string) => {
    const profileData = await getPatient(result);
    if (profileData) {
      setProfile(profileData);
    }
  };

  const handleUpdatePatientStatus = async (status: ProfileStatus) => {
    const update = await updatePatientStatus(status, profile.q_r_code);
    if (update) {
      handleScanQrCode(profile.q_r_code);
    }
  };

  return (
    <div>
      {profile ? (
        <>
          <VerifyContainer>
            <Profile
              profile={profile}
              role={userRole}
              title="Patient Profile"
              onStatusChange={handleUpdatePatientStatus}
              handleScanOther={handleScanOther}
            />
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
