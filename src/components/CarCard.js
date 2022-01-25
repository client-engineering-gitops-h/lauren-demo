import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";

const CarCard= () => {
    return (
        <div>
        <Card className="car-card" interactive={true} elevation={Elevation.One}>
            <h3><a href="#">IBM_1</a></h3>
            <div className="customer-details">
                <div>
                IMEI: 867688033558168
                </div>
                <div>
                Customer: IBM
                </div>
                <div>
                Onboarded: (created_at)
                </div>
                <div>
                Last Active: (updated_at)
                </div>
                <div>
                    Make: (make)
                </div>
                <div>
                    Model: (model)
                </div>
                    Color: (colour)
            </div>
            <div className="location-details">
                Approx. Address: (get vehicle location)
                <div>
                Mileage: (tracker_mileage): 365
                Lat:(latitude): 26.977220535278
                Long: (longitude): -82.31909942627
                </div>
            </div>

            <Button>Submit</Button>
        </Card>
        </div>
    );
}

export default CarCard;