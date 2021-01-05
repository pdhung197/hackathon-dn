import React from 'react';
import QRCode from 'qrcode.react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import { HImage } from '../HImage/HImage';
import { ProfileModel, ProfileStatus } from '../../helpers/models/Patient';

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
  max-height: 400px;
  max-width: 300px;
  margin: 0 auto;

  img {
    width: 100%;
  }
`;

const QRCodeContainer = styled.div`
  overflow: hidden;
  text-align: center;
`;

const StatusLabelText = styled.p`
  margin: 0;
  text-align: center;
  font-weight: 700;
`;

enum StatusLabelColor {
  Registered = 'red',
  Approval = 'green',
  FinishFirstTime = 'darkcyan',
  Done = 'blue',
}

enum StatusLabel {
  Registered = 'Registered',
  Approval = 'Approved',
  FinishFirstTime = 'Finish First Time',
  Done = 'Finish',
}

type ProfileProps = {
  profile: ProfileModel;
  role: 'admin' | 'assistant' | 'nurse' | undefined;
  title: string;
  onStatusChange?: (status: ProfileStatus) => void;
};

const getLabelByStatus = (status: ProfileStatus) => {
  switch (status) {
    case 'Registered':
      return 'Approve account';
    case 'Approval':
      return 'Finish First Time';
    case 'FinishFirstTime':
      return 'Finish';
    default:
      return null;
  }
};

export const Profile = ({
  profile,
  role,
  title = 'Patient Profile',
  onStatusChange = () => {},
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
  console.log({ q_r_code });
  return (
    <ProfileContainer container={true} spacing={5}>
      <TitleContainer item={true} xs={12}>
        <h4>{title}</h4>
      </TitleContainer>
      <ProfileInfo item={true} container={true} xs={12} sm={4} spacing={3}>
        <Grid item={true} xs={12}>
          <ProfileImageContainer>
            <HImage source={profile_url} title={full_name} />
          </ProfileImageContainer>
        </Grid>
        <Grid item={true} xs={12}>
          <StatusLabelText
            style={{
              color: StatusLabelColor[status],
            }}
          >
            {StatusLabel[status].toUpperCase()}
          </StatusLabelText>
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
        {role && getLabelByStatus(status) && (
          <Grid item={true} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onStatusChange(status)}
            >
              {getLabelByStatus(status)}
            </Button>
          </Grid>
        )}
      </ProfileInfo>
    </ProfileContainer>
  );
};
