
import { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: 'کاربر نمونه',
        email: 'user@example.com',
        phone: '09121234567',
    });

    const [editMode, setEditMode] = useState(true);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const toggleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // اینجا می‌تونی اطلاعات رو به سرور بفرستی
        console.log('اطلاعات ذخیره شد:', user);
        setEditMode(true);
    };

    return (
        <div className="profile-container">
            <h3>پروفایل کاربر</h3>

            <form className="profile-form" onSubmit={handleSubmit}>
                <label>
                    نام :
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </label>

                <label>
                    ایمیل :
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </label>

                <label>
                    شماره تماس :
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </label>

                <div className="profile-buttons">
                    {!editMode ? (
                        <button type="button" onClick={toggleEdit}>
                            ویرایش اطلاعات
                        </button>
                    ) : (
                        <button type="submit" onClick={toggleEdit}>ذخیره</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Profile;
