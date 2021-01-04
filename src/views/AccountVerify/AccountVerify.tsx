import { Button, Grid } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import dayjs from 'dayjs';

const ProfileContainer = styled(Grid)`
  border: 1px solid gray;
  border-radius: 10px;
`;

const TitleContainer = styled(Grid)`
  border-bottom: 1px solid gray;

  h4 {
    text-align: center;
    font-weight: 700;
  }
`;

const ProfileInfo = styled(Grid)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ProfileLabel = styled.span`
  font-weight: 700;
`;

const ProfileImageContainer = styled.div`
  overflow: hidden;
  text-align: center;
`;

const QRCodeContainer = styled.div`
  overflow: hidden;
  text-align: center;
`;

const StatusLabel = styled.p`
  margin: 0;
  text-align: center;
  font-weight: 700;
`;

export type ProfileStatus =
  | 'Registered'
  | 'Approval'
  | 'FinishFirstTime'
  | 'Done';

enum StatusLabelColor {
  Registered = 'red',
  Approval = 'green',
  FinishFirstTime = 'cyan',
  Done = 'blue',
}

export type Sex = 'Male' | 'Female' | 'Other';

export type Profile = {
  id: 0;
  full_name: string;
  personal_id: string;
  email: string;
  phone: string;
  password: string;
  q_r_code: string;
  profile_url: string;
  sex: Sex;
  birthday: string;
  address: string;
  created_date: string;
  approval_date: string;
  valid: boolean;
  remind_first_vaccinate_date_time: string;
  first_vaccinate_date_time: string;
  first_vaccinate_description: string;
  remind_second_vaccinate_date_time: string;
  second_vaccinate_date_time: string;
  second_vaccinate_description: string;
  status: ProfileStatus;
};

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
  const {
    full_name,
    personal_id,
    email,
    phone,
    q_r_code,
    profile_url,
    sex,
    birthday,
    address,
    approval_date,
    created_date,
    valid,
    status = 'Registered',
  } = exUser;

  return (
    <div>
      <div>
        <ProfileContainer container={true}>
          <TitleContainer item={true} xs={12}>
            <h4>Patient Profile</h4>
          </TitleContainer>
          <ProfileInfo item={true} container={true} xs={12} sm={4} spacing={3}>
            <Grid item={true} xs={12}>
              <ProfileImageContainer>
                <img src={profile_url} alt={full_name} />
              </ProfileImageContainer>
            </Grid>
            <Grid item={true} xs={12}>
              <StatusLabel
                style={{
                  color: StatusLabelColor[status],
                }}
              >
                {status.toUpperCase()}
              </StatusLabel>
            </Grid>
            <Grid item={true} xs={12}>
              <QRCodeContainer>
                <QRCode value={q_r_code} />
              </QRCodeContainer>
            </Grid>
          </ProfileInfo>
          <ProfileInfo item={true} container={true} xs={12} sm={8} spacing={3}>
            <Grid item={true} xs={12} sm={4}>
              <ProfileLabel>Full name</ProfileLabel>
            </Grid>
            <Grid item={true} xs={12} sm={8}>
              {full_name}
            </Grid>
            <Grid item={true} xs={12} sm={4}>
              <ProfileLabel>Date of birth</ProfileLabel>
            </Grid>
            <Grid item={true} xs={12} sm={8}>
              {dayjs(birthday).format('DD/MM/YYYY')}
            </Grid>
            <Grid item={true} xs={12} sm={4}>
              <ProfileLabel>Gender</ProfileLabel>
            </Grid>
            <Grid item={true} xs={12} sm={8}>
              {sex}
            </Grid>
            <Grid item={true} xs={12} sm={4}>
              <ProfileLabel>Personal Id</ProfileLabel>
            </Grid>
            <Grid item={true} xs={12} sm={8}>
              {personal_id}
            </Grid>
            <Grid item={true} xs={12} sm={4}>
              <ProfileLabel>Address</ProfileLabel>
            </Grid>
            <Grid item={true} xs={12} sm={8}>
              {address}
            </Grid>
            <Grid item={true} xs={12} sm={4}>
              <ProfileLabel>Phone number</ProfileLabel>
            </Grid>
            <Grid item={true} xs={12} sm={8}>
              {phone}
            </Grid>
            <Grid item={true} xs={12} sm={4}>
              <ProfileLabel>Email</ProfileLabel>
            </Grid>
            <Grid item={true} xs={12} sm={8}>
              <a href={`mailto:${email}`}>{email}</a>
            </Grid>
            <Grid item={true} xs={12}>
              <Button variant="contained" color="primary">
                Approve account
              </Button>
            </Grid>
          </ProfileInfo>
        </ProfileContainer>
      </div>
    </div>
  );
};
