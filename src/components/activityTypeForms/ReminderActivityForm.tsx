import { useState } from 'react';

export const ReminderActivityForm = ({ onClose, onSubmit }) => {
    const [reminderTime, setReminderTime] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            type: 'reminder',
            details: {
                reminder_time: new Date(reminderTime),
                note,
            },
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reminder Activity</h2>
            <label>
                Reminder Time:
                <input type="datetime-local" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} required />
            </label>
            <label>
                Note:
                <input type="text" value={note} onChange={(e) => setNote(e.target.value)} required />
            </label>
            <button type="submit">Add Activity</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};