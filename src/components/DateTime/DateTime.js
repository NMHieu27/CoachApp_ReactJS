import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import './datetime.scss';

export default function DateTime() {
    const [value, setValue] = React.useState(dayjs());
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                InputProps={{
                    disableUnderline: true,
                }}
                variant="inline"
                value={value}
                minDate={dayjs('2017-01-01')}
                inputFormat="DD/MM/YYYY"
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => (
                    <TextField variant="standard" sx={{ height: '100%', padding: '15px 20px' }} {...params} />
                )}
            />
        </LocalizationProvider>
    );
}
