import React, { useState, useEffect } from 'react'

const EditForm = props => {
    const [doc, setDoc] = useState(props.currentDoc)

    const handleInputChange = event => {
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
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={doc.name}
                onChange={handleInputChange}
            />
            <label>Email</label>
            <input
                type="text"
                name="email"
                value={doc.email}
                onChange={handleInputChange}
            />
            <label>Phone</label>
            <input
                type="text"
                name="phone"
                value={doc.phone}
                onChange={handleInputChange}
            />
            <label>Password</label>
            <input
                type="password"
                name="password"
                value={doc.password}
                onChange={handleInputChange}
            />
            <button>Update Passenger</button>
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
