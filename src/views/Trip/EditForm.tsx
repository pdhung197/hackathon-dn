import React, { useState, useEffect } from 'react'

const EditForm = (props: any) => {
  const [doc, setDoc] = useState(props.currentDoc)

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setDoc({ ...doc, [name]: value })
  }

  useEffect(() => {
    setDoc(props.currentDoc)
  }, [props])

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        props.updateDoc(doc)
      }}
    >
      <label>vehicleCapacity</label>
      <input
        type="text"
        name="vehicleCapacity"
        value={doc.vehicleCapacity}
        onChange={handleInputChange}
      />
      <label>vehicleModel</label>
      <input
        type="text"
        name="vehicleModel"
        value={doc.vehicleModel}
        onChange={handleInputChange}
      />
      <label>vehicleColor</label>
      <input
        type="text"
        name="vehicleColor"
        value={doc.vehicleColor}
        onChange={handleInputChange}
      />
      <label>vehicleLicensePlate</label>
      <input
        type="text"
        name="vehicleLicensePlate"
        value={doc.vehicleLicensePlate}
        onChange={handleInputChange}
      />
      <label>vehicleAmenities</label>
      <input
        type="text"
        name="vehicleAmenities"
        value={doc.vehicleAmenities}
        onChange={handleInputChange}
      />

      <label>vehicleId</label>
      <input
        type="text"
        name="vehicleId"
        value={doc.vehicleId}
        onChange={handleInputChange}
      />
      <label>vehicleName</label>
      <input
        type="text"
        name="vehicleName"
        value={doc.vehicleName}
        onChange={handleInputChange}
      />
      <label>driverId</label>
      <input
        type="text"
        name="driverId"
        value={doc.driverId}
        onChange={handleInputChange}
      />
      <label>driverName</label>
      <input
        type="text"
        name="driverName"
        value={doc.driverName}
        onChange={handleInputChange}
      />
      <label>driverPhone</label>
      <input
        type="text"
        name="driverPhone"
        value={doc.driverPhone}
        onChange={handleInputChange}
      />
      <button>Update Trip</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  )
}

export default EditForm
