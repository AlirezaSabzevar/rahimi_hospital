
import { useState } from "react";
import { FaUserMd, FaHospital, FaPhoneAlt, FaCalendarAlt, FaTimes } from "react-icons/fa";
import "./oncallList.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";
import "react-datepicker/dist/react-datepicker.css";

moment.loadPersian({ dialect: "persian-modern" });



const onCallData = [
    {id: 1, name:'دکتر عنبری', hospital:'بیمارستان رحیمی', specialty:'اطفال', phone:'09122630593', date: '1404/01/07', avatar: require('../Images/3774299.png')},
    {id: 2, name:'دکتر مالکی', hospital:'بیمارستان رحیمی', specialty:'گوارش', phone:'09125890593', date: '1404/01/08', avatar: require('../Images/3774299.png')},
    {id: 3, name:'دکتر عبدالهی', hospital:'بیمارستان رحیمی', specialty:'قلب', phone:'09121230593', date: '1404/01/04', avatar: require('../Images/3774299.png')},
    {id: 4, name:'دکتر بهرامی', hospital:'بیمارستان رحیمی', specialty:'نوزادان', phone:'09120760593', date: '1404/01/10', avatar: require('../Images/3774299.png')},
    {id: 5, name:'دکتر صالحی', hospital:'بیمارستان مدنی', specialty:'قلب', phone:'09389875048', date: '1404/01/03', avatar: require('../Images/3774299.png')},
    {id: 6, name:'دکتر قاسمی', hospital:'بیمارستان عشایر', specialty:'جراحی', phone:'09186393625', date: '1404/01/07', avatar: require('../Images/3774299.png')},
    {id: 7, name:'دکتر احمدی', hospital:'بیمارستان سینا', specialty:'مغز و اعصاب', phone:'09187873625', date: '1404/01/06', avatar: require('../Images/3774299.png')},
    {id: 8, name:'دکتر شفیعی', hospital:'بیمارستان شفا', specialty:'آنکولوژی', phone:'09182583625', date: '1404/01/04', avatar: require('../Images/3774299.png')},
];

const OnCallList = () => {
    const [selectedHospital, setSelectedHospital] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    const handleFilter = () => {

        const formattedDate = selectedDate ? moment(selectedDate.toDate()).format("jYYYY/jMM/jDD") : "";

        const filteredDoctor = onCallData.filter((doctor) =>
            (selectedHospital ? doctor.hospital === selectedHospital : true) &&
            (formattedDate ? doctor.date === formattedDate : true)
        );

        setFilteredDoctors(filteredDoctor);
    };

    const handleClearData = () => {
        setSelectedDate(null);
        setFilteredDoctors([]);
    }

    return (
        <div className="on-call-container">
            <h3>لیست پزشکان آنکال</h3>

            <div className="filter-group">

                <select onChange={(e) => setSelectedHospital(e.target.value)}>
                    <option value="">-- انتخاب بیمارستان --</option>
                    {Array.from(new Set(onCallData.map(d => d.hospital))).map(hospital => (
                        <option key={hospital} value={hospital}>{hospital}</option>
                    ))}
                </select>

                <div className="date-picker-container">
                    <DatePicker
                        id="date"
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        calendar={persian}
                        locale={persian_fa}
                        format="YYYY/MM/DD"
                        className="custom-date-picker"
                        placeholder="-- تاریخ مدنظر را انتخاب کنید --"
                    />
                    {selectedDate && (
                        <button className="clear-date-btn" onClick={handleClearData} title="پاک کردن تاریخ">
                            <FaTimes/>
                        </button>
                    )}
                </div>
            </div>

            <button className="search-button" onClick={handleFilter}>جستجو</button>


            <div className="oncall-doctor-list">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="oncall-doctor-card">
                            <img src={doctor.avatar} alt={doctor.name} className="oncall-doctor-avatar" />
                            <div>
                                <h4>{doctor.name}</h4>
                                <p><FaUserMd /> {doctor.specialty}</p>
                                <p><FaHospital /> {doctor.hospital}</p>
                                <p><FaCalendarAlt /> تاریخ : {doctor.date}</p>
                                <a href={`tel:${doctor.phone}`} className="oncall-list-button">
                                    <FaPhoneAlt /> تماس با پزشک
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">هیچ پزشک آنکالی یافت نشد.</p>
                )}
            </div>
        </div>
    );
};

export default OnCallList;
