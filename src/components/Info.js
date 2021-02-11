import React from 'react'
import { Stats } from './Stats'
import { Features } from './Features'

export const
    Info = ({ id, name, hp, xp, types, weight, height }) => {

        return (
            <div className="info">

                <span className="number">#{id}</span>

                <h3 className="name">{name}</h3>

                <Stats hp={hp} xp={xp} />

                <Features types={types} weight={weight} height={height} />

            </div>
        )
    }