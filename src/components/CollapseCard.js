import React from "react";
import { Button, Card, Elevation, Collapse, Pre } from "@blueprintjs/core";

// trying to make a way for the card to collape rather than having all the info on one page
// NOT CURRENTLY A WORKING COMPONENT

const CollapsableCard = () => {
    const handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    return(
        <div>
            <Button onClick={handleClick}> build logs </Button>
            <Collapse isOpen={this.state.isOpen}>
                <Pre>
                    Dummy text.
                </Pre>
            </Collapse>
        </div>

    )
}

export default CollapsableCard;