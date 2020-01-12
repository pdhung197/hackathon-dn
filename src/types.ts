export interface User {
  userId: string
  name: string
}

export interface Trip {
  id: string
  alias: string
  routes: string
  departureAddress: string
  departureLatitude: string
  departureLongitude: string
  departureDatetime: string
  destinationAddress: string
  destinationLatitude: string
  destinationLongitude: string
  estimatedArrivalTime: string
  vehicleId: string
  vehicleName: string
  vehicleCapacity: string
  vehicleModel: string
  vehicleColor: string
  vehicleLicensePlate: string
  vehicleAmenities: string
  vehicleRow: string
  vehicleColumn: number
  vehicleState: number
  driverId: string
  driverName: string
  driverPhone: string
  driverEmail: string
  createdAt: object | null
  updatedAt: object | null
  bookings: object
}

export interface Rider {
  id: string | null
  name: string
  email: string
  phone: string
  createdAt: object | null
  updatedAt: object | null
}

export interface Vehicle {
  id: string | null
  name: string
  row: string
  column: number
  capacity: number
  color: string
  model: string
  licensePlate: string
  amenities: string
  state: number
}

export interface Driver {
  id: string | null
  name: string
  email: string
  phone: string
  attachName: string
  attachUrl: string
  createdAt: object | null
  updatedAt: object | null
}

export interface Pickup {
  pickupAddress: string
  pickupLatitude: number
  pickupLongitude: number
}

export interface Dropoff {
  dropoffAddress: string
  dropoffLatitude: number
  dropoffLongitude: number
}

export interface Seat {
  seatState: number
}

export interface CurrentSeat {
  seatId: string
  seatState: number
}

export interface Booking {
  id: string
  tripAlias: string
  riderName: string
  driverName: string
  vehicleName: string
  pickupLatitude: string
  pickupLongitude: string
  dropoffLatitude: string
  dropoffLongitude: string
  seatId: string
  createdAt: object
  updatedAt: object
}

export interface Seats {
  A1: Seat
  A2: Seat
  A3: Seat
  A4: Seat
  B1: Seat
  B2: Seat
  B3: Seat
  B4: Seat
  C1: Seat
  C2: Seat
  C3: Seat
  C4: Seat
  D1: Seat
  D2: Seat
  D3: Seat
  D4: Seat
  E1: Seat
  E2: Seat
  E3: Seat
  E4: Seat
  F1: Seat
  F2: Seat
  F3: Seat
  F4: Seat
  G1: Seat
  G2: Seat
  G3: Seat
  G4: Seat
  H1: Seat
  H2: Seat
  H3: Seat
  H4: Seat
  I1: Seat
  I2: Seat
  I3: Seat
  I4: Seat
  J1: Seat
  J2: Seat
  J3: Seat
  J4: Seat
  K1: Seat
  K2: Seat
  K3: Seat
  K4: Seat
  L1: Seat
  L2: Seat
  L3: Seat
  L4: Seat
  M1: Seat
  M2: Seat
  M3: Seat
  M4: Seat
  N1: Seat
  N2: Seat
  N3: Seat
  N4: Seat
}

const initSeat = {
  seatState: 0,
}

export const initSeats = {
  A1: initSeat,
  A2: initSeat,
  A3: initSeat,
  A4: initSeat,
  B1: initSeat,
  B2: initSeat,
  B3: initSeat,
  B4: initSeat,
  C1: initSeat,
  C2: initSeat,
  C3: initSeat,
  C4: initSeat,
  D1: initSeat,
  D2: initSeat,
  D3: initSeat,
  D4: initSeat,
  E1: initSeat,
  E2: initSeat,
  E3: initSeat,
  E4: initSeat,
  F1: initSeat,
  F2: initSeat,
  F3: initSeat,
  F4: initSeat,
  G1: initSeat,
  G2: initSeat,
  G3: initSeat,
  G4: initSeat,
  H1: initSeat,
  H2: initSeat,
  H3: initSeat,
  H4: initSeat,
  I1: initSeat,
  I2: initSeat,
  I3: initSeat,
  I4: initSeat,
  J1: initSeat,
  J2: initSeat,
  J3: initSeat,
  J4: initSeat,
  K1: initSeat,
  K2: initSeat,
  K3: initSeat,
  K4: initSeat,
  L1: initSeat,
  L2: initSeat,
  L3: initSeat,
  L4: initSeat,
  M1: initSeat,
  M2: initSeat,
  M3: initSeat,
  M4: initSeat,
  N1: initSeat,
  N2: initSeat,
  N3: initSeat,
  N4: initSeat,
}

export type UserCredential = {
  additionalUserInfo: {
    isNewUser: boolean
    providerId: string
  }
  credential: string
  operationType: string
  user: {
    apiKey: string
    appName: string
    authDomain: string
    createdAt: string
    displayName: string
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    lastLoginAt: string
    phoneNumber: string
    photoURL: string
    providerData: Array<any>
    redirectEventId: string
    stsTokenManager: Array<Record<string, any>>
    tenantId: string
    uid: string
  }
}
