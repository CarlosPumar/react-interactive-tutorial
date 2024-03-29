import React from 'react';
import type { HTMLAttributes } from 'react';
import {createPortal} from 'react-dom'

const Opaque = ({...rest}: HTMLAttributes<HTMLDivElement>) => {
    return createPortal(
        <div 
            {...rest}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: '10000',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                mixBlendMode: 'hard-light',
                overflow: 'hidden',
            }} 
        />,
        document.body
      )
}

export default Opaque;