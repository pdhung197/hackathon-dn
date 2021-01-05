import React from 'react';
import QRCode from 'qrcode.react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import { HImage } from '../HImage/HImage';
import { ProfileModel, ProfileStatus } from '../../helpers/models/Patient';
import AprrovalIcon from '../../assets/img/approval.png';

const ProfileContainer = styled(Grid)`
  border: 1px solid gray;
  border-radius: 5px;
  text-align: left;
  margin-top: 20px;
`;

const TitleContainer = styled(Grid)`
  border-bottom: 1px solid gray;
  position: relative;

  h4 {
    text-align: center;
    font-weight: 700;
    margin: 0;
  }

  button {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const ProfileInfoContainer = styled(Grid)`
  padding: 25px;
`;

const ProfileInfo = styled(Grid)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ProfileLabel = styled.p`
  margin: 0;
  font-weight: 700;
`;

const ProfileImageContainer = styled.div`
  text-align: center;
  max-height: 400px;
  max-width: 300px;
  margin: 0 auto;
  position: relative;

  img {
    max-width: 100%;
    max-height: 100%;

    &.checked {
      position: absolute;
      top: calc(100% - 40px);
      right: 10px;
    }
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
  Approval = 'Account Verified',
  FinishFirstTime = 'Finished First Time',
  Done = 'Vaccinated',
}

type ProfileProps = {
  profile: ProfileModel;
  role?: 'admin' | 'assistant' | 'nurse' | undefined;
  title: string;
  onStatusChange?: (status: ProfileStatus) => void;
  handleScanOther?: () => void;
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
  handleScanOther = () => {},
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
    first_vaccinate_date_time,
    first_vaccinate_description,
    remind_first_vaccinate_date_time,
    remind_second_vaccinate_date_time,
    second_vaccinate_date_time,
    second_vaccinate_description,
    status = 'Registered',
  } = profile;

  return (
    <ProfileContainer container={true} spacing={3}>
      <TitleContainer item={true} xs={12}>
        <h4>{title}</h4>
        <Button variant="contained" color="secondary" onClick={handleScanOther}>
          Scan other
        </Button>
      </TitleContainer>
      <ProfileInfoContainer
        container={true}
        xs={12}
        spacing={3}
        direction={role ? 'row' : 'column'}
        style={{
          alignItems: role ? 'flex-start' : 'center',
        }}
      >
        <ProfileInfo
          item={true}
          container={true}
          xs={12}
          sm={role ? 4 : 12}
          spacing={2}
        >
          <Grid item={true} xs={12}>
            <ProfileImageContainer>
              <HImage source={profile_url} title={full_name} />
              {status === 'Done' && (
                <img
                  className="checked"
                  src={AprrovalIcon}
                  alt="approval"
                  style={{ width: 50, height: 50 }}
                />
              )}
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
        <ProfileInfo item={true} container={true} xs={12} sm={8} spacing={2}>
          <Grid item={true} xs={12} sm={role ? 4 : 6}>
            <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>
              Full name
            </ProfileLabel>
          </Grid>
          <Grid item={true} xs={12} sm={role ? 8 : 6}>
            {full_name}
          </Grid>
          <Grid item={true} xs={12} sm={role ? 4 : 6}>
            <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>
              Date of birth
            </ProfileLabel>
          </Grid>
          <Grid item={true} xs={12} sm={role ? 8 : 6}>
            {dayjs(birthday).format('DD/MM/YYYY')}
          </Grid>
          {role && (
            <>
              <Grid item={true} xs={12} sm={role ? 4 : 6}>
                <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>
                  Gender
                </ProfileLabel>
              </Grid>
              <Grid item={true} xs={12} sm={role ? 8 : 6}>
                {sex}
              </Grid>
            </>
          )}

          <Grid item={true} xs={12} sm={role ? 4 : 6}>
            <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>
              Personal Id
            </ProfileLabel>
          </Grid>
          <Grid item={true} xs={12} sm={role ? 8 : 6}>
            {personal_id}
          </Grid>
          {role && (
            <>
              <Grid item={true} xs={12} sm={role ? 4 : 6}>
                <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>
                  Address
                </ProfileLabel>
              </Grid>
              <Grid item={true} xs={12} sm={role ? 8 : 6}>
                {address}
              </Grid>
              <Grid item={true} xs={12} sm={role ? 4 : 6}>
                <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>
                  Phone number
                </ProfileLabel>
              </Grid>
              <Grid item={true} xs={12} sm={role ? 8 : 6}>
                {phone}
              </Grid>
              <Grid item={true} xs={12} sm={role ? 4 : 6}>
                <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>
                  Email
                </ProfileLabel>
              </Grid>
              <Grid item={true} xs={12} sm={role ? 8 : 6}>
                <a href={`mailto:${email}`}>{email}</a>
              </Grid>
            </>
          )}

          {approval_date && (
            <>
              <Grid item={true} xs={12} sm={role ? 4 : 6}>
                <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>
                  Verify Date
                </ProfileLabel>
              </Grid>
              <Grid item={true} xs={12} sm={role ? 8 : 6}>
                {dayjs(approval_date).format('DD/MM/YYYY HH:mm')}
              </Grid>
            </>
          )}

          {first_vaccinate_date_time && (
            <>
              <Grid item={true} xs={12} sm={role ? 4 : 6}>
                <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>
                  First Vaccinate Date
                </ProfileLabel>
              </Grid>
              <Grid item={true} xs={12} sm={role ? 8 : 6}>
                {dayjs(first_vaccinate_date_time).format('DD/MM/YYYY HH:mm')}
              </Grid>

              {/* <Grid item={true} xs={12} sm={role ? 4 : 6}>
                <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>First Vaccinate Note</ProfileLabel>
              </Grid>
              <Grid item={true} xs={12} sm={role ? 8 : 6}>
                {first_vaccinate_description || ''}
              </Grid> */}
            </>
          )}

          {second_vaccinate_date_time && (
            <>
              <Grid item={true} xs={12} sm={role ? 4 : 6}>
                <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>
                  Second Vaccinate Date
                </ProfileLabel>
              </Grid>
              <Grid item={true} xs={12} sm={role ? 8 : 6}>
                {dayjs(second_vaccinate_date_time).format('DD/MM/YYYY HH:mm')}
              </Grid>

              {/* <Grid item={true} xs={12} sm={role ? 4 : 6}>
                <ProfileLabel style={{ textAlign: role ? 'start' : 'end' }}>Second Vaccinate Note</ProfileLabel>
              </Grid>
              <Grid item={true} xs={12} sm={role ? 8 : 6}>
                {second_vaccinate_description || ''}
              </Grid> */}
            </>
          )}
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
      </ProfileInfoContainer>
    </ProfileContainer>
  );
};
