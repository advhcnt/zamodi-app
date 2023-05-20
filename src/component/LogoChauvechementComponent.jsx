import { Image } from '@mantine/core';
import React from 'react';
import mtnLogo from "./../assets/momo.png";
import sbinLogo from "./../assets/celtiis.png";

function LogoChauvechementComponent(props) {
    return (
        <div style={{ display: "flex" }}>
            <Image
                src={mtnLogo}
                style={{ height: "100%", width: "100%", zIndex: 1 }}
                alt={"Logo mtn"}
            />
            <Image
                src={sbinLogo}
                style={{
                    height: "100%",
                    width: "100%",
                    zIndex: 1000,
                    marginLeft: -15,
                }}
                alt={"Logo mtn"}
            />
        </div>  
    )
}

export default LogoChauvechementComponent;