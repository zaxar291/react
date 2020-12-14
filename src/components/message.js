import React from 'react'
import Swal from 'sweetalert2'

export const Message = ({message, messageType}) => {
    Swal.fire({
        icon: messageType,
        text: message
    })
    return ""
}
