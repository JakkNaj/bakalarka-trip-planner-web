import { useState } from 'react';

export const ReminderActivityForm = ({ setDetails }) => {
    const [reminderTime, setReminderTime] = useState('');
    const [note, setNote] = useState('');

    const onEditField = (fieldSetter) => (e) => {
        fieldSetter(e.target.value);
        setDetails({
            reminder_time: reminderTime,
            note,
        });
    };

    return (
        <>
            <h2>Reminder Activity</h2>
            <label>
                Reminder Time:
                <input type="datetime-local" value={reminderTime} onChange={onEditField(setReminderTime)} />
            </label>
            <label>
                Note:
                <input type="text" value={note} onChange={onEditField(setNote)} />
            </label>
        </>
    );
};