import { Button, Container, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Profile } from '../../components/Profile/Profile';
import { ScanQRCode } from '../ScanQRCode/ScanQRCode';
import restClient from '../../services/rest-client';
import { get, split } from 'lodash';
import AprrovalIcon from '../../assets/img/approval.png';

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
  const [profile, setProfile] = useState<Profile>((null as unknown) as Profile);
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
    setProfile((null as unknown) as Profile);
    setQrCode(undefined);
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
    }
  }, [qrCode]);

  return (
    <Container
      maxWidth="md"
      style={{ backgroundColor: '#ffffff', padding: 20 }}
    >
      <Typography
        component="h1"
        variant="h5"
        style={{ textAlign: 'center', margin: 20 }}
      >
        Vaccination Check
      </Typography>
      {profile && qrCode ? (
        <>
          {get(profile, 'valid') && (
            <div style={{ textAlign: 'center' }}>
              <img
                src={AprrovalIcon}
                alt="approval"
                style={{ width: 100, height: 100 }}
              />
            </div>
          )}
          <VerifyContainer>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleScanOther}
            >
              Scan
            </Button>
            <div
              style={{
                margin: 15,
              }}
            >
              <Profile profile={profile} role="viewer" title="Detail" />
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
