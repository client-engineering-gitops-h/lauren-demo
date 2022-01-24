import * as React from "react";
import { Button, Menu, MenuItem, Icon } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
// import { Classes, Popover2 } from "@blueprintjs/popover2";


const NavMenu=() => {
    return ( 
        <div>
        <Icon size={18} icon="grid-view"/>

        {/* <Popover2 content={<Menu>
            <MenuItem icon="graph" text="Graph" />
            <MenuItem icon="map" text="Map" />
            <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
            <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
        </Menu>} placement="right-end">
       <Button icon="grid-view" />
        </Popover2> */}
        </div>
    );
}

export default NavMenu;