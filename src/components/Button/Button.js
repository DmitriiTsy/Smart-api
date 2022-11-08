import React from 'react'
import '../Button/Button.css'

const Button = ({ handler, className, text, disabled }) => {
    return (
        <div>
            <button onClick={handler} className={className} disabled={disabled} type="submit">{text}</button>
        </div>

    )
}

export default Button