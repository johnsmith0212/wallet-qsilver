import { useState } from "react";

import { handleCopy } from "../../utils/helper";
import { Text } from "../commons";
import SwitchButton from "../dashboard/SwitchButton";

const Navbar = () => {

    return (
        <>
            <div className="grid grid-cols-[230px_1fr] gap-10 items-center">
                <div className="w-[230px]">
                    <img src="/assets/images/logo.svg" />
                </div>
                    <SwitchButton />
                </div>
            </div>
        </>
    );
};

export default Navbar;
