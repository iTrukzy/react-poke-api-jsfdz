import React from 'react'

export const
    SearchBar = ({ value, check }) => {

        return (
            <div className="form-group">
                <label className='input'>
                    <input type="search" onChange={value} placeholder={check ? 'write type name or id' : 'write pokemon name or id'} />
                    <span className="search-icon"></span>
                </label>
            </div>
        )
    }