import React from 'react'

const Button = ({ form, handler, className, text, disabled }) => {
    return (
        <div>
            <button onClick={handler} className={className} disabled={disabled} type="submit" form={form}>{text}</button>
        </div>

    )
}

export default Button