import React, { useState} from "react";
import Header from '../components/Header'
import InstalledDeviceList from '../components/InstalledDeviceList';
import DeviceDetails from '../components/DeviceDetails';
import DeviceForm from '../components/DeviceForm';
import { Box, Grid} from '@mui/material'


export default function MainPage() {
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [action, setAction] = useState(null);

    return (

        <>
        <Header />
            <Grid container className="p-4">
            {/* Left panel: device list */}
            <Grid item xs={12} md={4}>
            <InstalledDeviceList
                onSelect={(device) => {
                setSelectedDevice(device);
                setAction('view');
                }}
                onAdd={() => setAction('add')}
                onEdit={(device) => {
                setSelectedDevice(device);
                setAction('edit');
                }}
                onService={(device) => {
                setSelectedDevice(device);
                setAction('service');
                }}
            />
                </Grid>

                {/* Right panel: details or form */}
                <Grid item xs={12} md={8}>
                {action === 'view' && selectedDevice && <DeviceDetails device={selectedDevice} />}
                {action === 'edit' && <DeviceForm device={selectedDevice} mode="edit" />}
                {action === 'add' && <DeviceForm mode="add" />}
                {action === 'service' && <div>Service Form Here</div>}
                </Grid>
            </Grid>
        </>
    );

}