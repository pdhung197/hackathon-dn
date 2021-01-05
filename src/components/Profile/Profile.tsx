import React from 'react';
import QRCode from 'qrcode.react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';

const ProfileContainer = styled(Grid)`
  border: 1px solid gray;
  border-radius: 5px;
  text-align: left;
  margin-top: 20px;
`;

const TitleContainer = styled(Grid)`
  border-bottom: 1px solid gray;

  h4 {
    text-align: center;
    font-weight: 700;
    margin: 0;
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

enum StatusLabelColor {
  Registered = 'red',
  Approval = 'green',
  FinishFirstTime = 'cyan',
  Done = 'blue',
}

export type ProfileStatus =
  | 'Registered'
  | 'Approval'
  | 'FinishFirstTime'
  | 'Done';

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

type ProfileProps = {
  profile: Profile;
  role: 'admin' | 'assistant' | 'viewer';
  title: string;
};

export const Profile = ({
  profile,
  role,
  title = 'Patient Profile',
}: ProfileProps) => {
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
  } = profile;

  return (
    <ProfileContainer container={true} spacing={5}>
      <TitleContainer item={true} xs={12}>
        <h4>{title}</h4>
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
        {status === 'Registered' ? (
          <Grid item={true} xs={12}>
            <Button variant="contained" color="primary">
              Approve account
            </Button>
          </Grid>
        ) : null}
      </ProfileInfo>
    </ProfileContainer>
  );
};
