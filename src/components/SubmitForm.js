import React from 'react';
import { Card, InputGroup, Text} from '@blueprintjs/core';
import {DatePicker, TimePicker} from '@blueprintjs/datetime';

const SubmitForm=() => {
    return( 
        <div>
            <Card className='submit-card'>
                {/* Gonna have to switch this to blueprint Select: 
                https://blueprintjs.com/docs/#select/select-component.querying */}
                <div>
                    For this section: we want to have Select for PU/DO Locations and 
                    then Date Picker and Time Picker for PU/DO date and time as seen 
                    in: https://codesandbox.io/s/blueprint-sandbox-et9xy?file=/src/SelectExample.tsx
                </div>
                <InputGroup type="search" placeholder='Pick Up Location' />
                <InputGroup type="search" placeholder='Pick Up Date' />
                <InputGroup type="search" placeholder='Pick Up Time' />
                <InputGroup type="search" placeholder='Drop Off Location' />
                <InputGroup type="search" placeholder='Drop Off Date' />
                <InputGroup type="search" placeholder='Drop Off Time' />

            </Card>
            

        </div>

    )
}

export default SubmitForm;