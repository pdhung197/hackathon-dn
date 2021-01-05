import { Button, Container, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Profile } from '../../components/Profile/Profile';
import { ScanQRCode } from '../ScanQRCode/ScanQRCode';
import restClient from '../../services/rest-client';
import { get, split } from 'lodash';
import AprrovalIcon from '../../assets/img/approval.png';
import { ProfileModel } from '../../helpers/models/Patient';

const VerifyContainer = styled.div`
  text-align: right;
`;

const QRContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const VaccinationCheck = ({
  match,
  location,
}: {
  match: any;
  location: any;
}) => {
  const [profile, setProfile] = useState<ProfileModel>(
    (null as unknown) as ProfileModel,
  );
  const [qrCode, setQrCode] = useState<string | undefined>();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (location && location.search) {
      const code = split(location.search, '=')[1];
      if (code) {
        setQrCode(code);
      }
    }
  }, [location]);

  const handleScanOther = () => {
    setQrCode(undefined);
    setProfile((null as unknown) as ProfileModel);
  };

  const handleScanQrCode = async (result: string) => {
    setQrCode(result);
    if (result) {
      const code = split(result, '=')[1];
      if (code) {
        setQrCode(code);
      }
    }
  };

  useEffect(() => {
    if (qrCode) {
      restClient
        .get('/api/vistors/profile', {
          params: {
            qr: qrCode,
          },
        })
        .then(resp => {
          if (resp.status === 200) {
            setProfile(resp.data);
          }
        })
        .finally(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, [qrCode]);

  return (
    <Container
      maxWidth="md"
      style={{ backgroundColor: '#ffffff', padding: 20 }}
    >
      {profile && qrCode ? (
        <>
          <VerifyContainer>
            <div
              style={{
                margin: 15,
              }}
            >
              <Profile
                profile={profile}
                title="Customer Detail"
                handleScanOther={handleScanOther}
              />
            </div>
          </VerifyContainer>
        </>
      ) : (
        loaded && (
          <QRContainer>
            <ScanQRCode
              onScanned={handleScanQrCode}
              size={{ width: 600, height: 600 }}
            />
          </QRContainer>
        )
      )}
    </Container>
  );
};
