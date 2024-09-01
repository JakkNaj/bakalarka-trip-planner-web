import { useState } from 'react';
import { InsertReminderType } from '../../types/activities/reminder/ReminderActivity';

type ReminderActivityFormProps = {
    setDetails: (details: InsertReminderType) => void;
};

export const ReminderActivityForm = ({ setDetails }: ReminderActivityFormProps) => {
    const [reminderTime, setReminderTime] = useState('');
    const [note, setNote] = useState('');

    const onEditField = (fieldSetter: (value: string) => void) => (e : React.ChangeEvent<HTMLInputElement>) => {
        fieldSetter(e.target.value);
        setDetails({
            reminder_time: new Date(reminderTime),
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