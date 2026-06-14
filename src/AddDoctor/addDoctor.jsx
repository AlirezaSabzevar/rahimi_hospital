
import { useState } from "react";
import "./addDoctor.css";

const AddDoctor = () => {

    const [doctor, setDoctor] = useState({
        name: "",
        specialty: "",
        hospital: "",
        phone: "",
        avatar: "",
    });

    const handleChange = (e) => {
        setDoctor({...doctor, [e.target.name] : e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!doctor.name || !doctor.specialty || !doctor.hospital || !doctor.phone) {
            alert("لطفا تمام فیلدها را پر کنید!");
            return;
        }

        console.log("Added Doctor:", doctor);
        setDoctor({ name: "", specialty: "", hospital: "", phone: "", avatar: "" });
    };

    return (
        <div className="add-doctor-container">
            <h3>افزودن پزشک جدید</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={doctor.name}
                    onChange={handleChange}
                    placeholder="نام پزشک"
                    required
                />
                <input
                    type="text"
                    name="specialty"
                    value={doctor.specialty}
                    onChange={handleChange}
                    placeholder="تخصص"
                    required
                />
                <input
                    type="text"
                    name="hospital"
                    value={doctor.hospital}
                    onChange={handleChange}
                    placeholder="بیمارستان"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={doctor.phone}
                    onChange={handleChange}
                    placeholder="شماره تماس"
                    required
                />
                <input
                    type="text"
                    name="avatar"
                    value={doctor.avatar}
                    onChange={handleChange}
                    placeholder="لینک تصویر پزشک (اختیاری)"
                />
                <button type="submit">افزودن پزشک</button>
            </form>
        </div>
    );
};

export default AddDoctor;
