import './appointment.css';
import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";
import { useThemeStore } from '../store';
import { FaPhoneAlt, FaPhoneSquare, FaUserMd, FaHospital, FaTimes } from 'react-icons/fa';




const AppointmentBox = () => {

    const theme = useThemeStore((state) => state.theme);

    const [selectedHospital, setSelectedHospital] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment().format("jYYYY/jMM/jDD"));
    const [searchHospital, setSearchHospital] = useState("");
    const [searchDepartment, setSearchDepartment] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);



    const hospitalsData = {
        'بیمارستان شهید رحیمی' : ['اطفال','گوارش','قلب','نوزادان'],
        'بیمارستان مدنی' : ['داخلی','جراحی','قلب','اطفال'],
        'بیمارستان عشایر' : ['حوادث','جراحی','قلب','زنان'],
        'بیمارستان سینا' : ['داخلی','مغز و اعصاب','قلب','زنان'],
        'بیمارستان فوق تخصصی شفا' : ['آنکولوژی','جراحی','قلب','زنان'],
        'بیمارستان شجاع' : ['داخلی','جراحی','قلب','غدد'],
        'بیمارستان کوثر بروجرد' : ['داخلی','جراحی','عفونی','زنان'],
        'بیمارستان امام خمینی بروجرد' : ['داخلی','جراحی','قلب','دهان و دندان'],
        'بیمارستان دکتر چمران بروجرد' : ['گوارش','جراحی','قلب','زنان'],
        'بیمارستان امام خمینی سلسله' : ['داخلی','ارتوپدی','قلب','زنان'],
        'بیمارستان شهدای هفتم تیر دورود' : ['داخلی','جراحی','تغذیه','زنان'],
        'بیمارستان امام علی ازنا' : ['داخلی','جراحی','قلب','کلیه'],
        'بیمارستان امام جعفر صادق الیگودرز' : ['داخلی','جراحی','قلب','کلیه'],
    }
    const doctors = [ 
        {name:'دکتر عنبری', hospital:'بیمارستان شهید رحیمی', specialty:'اطفال', phone:'09122630593', avatar: require('../Images/3774299.png')},
        {name:'دکتر مالکی', hospital:'بیمارستان رحیمی', specialty:'گوارش', phone:'09125890593', avatar: require('../Images/3774299.png')},
        {name:'دکتر عبدالهی', hospital:'بیمارستان رحیمی', specialty:'قلب', phone:'09121230593', avatar: require('../Images/3774299.png')},
        {name:'دکتر بهرامی', hospital:'بیمارستان رحیمی', specialty:'نوزادان', phone:'09120760593', avatar: require('../Images/3774299.png')},
        {name:'دکتر صالحی', hospital:'بیمارستان مدنی', specialty:'قلب', phone:'09389875048', avatar: require('../Images/3774299.png')},
        {name:'دکتر قاسمی', hospital:'بیمارستان عشایر', specialty:'جراحی', phone:'09186393625', avatar: require('../Images/3774299.png')},
        {name:'دکتر احمدی', hospital:'بیمارستان سینا', specialty:'مغز و اعصاب', phone:'09187873625', avatar: require('../Images/3774299.png')},
        {name:'دکتر شفیعی', hospital:'بیمارستان فوق تخصصی شفا', specialty:'آنکولوژی', phone:'09182583625', avatar: require('../Images/3774299.png')},
    ];

    // محاسبه تعداد بیمارستان‌ها، تخصص‌ها و پزشکان آنکال
    const totalHospitals = Object.keys(hospitalsData).length;
    const totalDepartments = [...new Set(Object.values(hospitalsData).flat())].length;
    const totalDoctors = doctors.length;



    const hospitals = Object.keys(hospitalsData).filter(hospital => 
        hospital.includes(searchHospital)
    );

    const departments = selectedHospital ? hospitalsData[selectedHospital].filter(dept => 
        dept.includes(searchDepartment)
    ) : [];

    const filteredDoctor = doctors.find(
        (doctor) => doctor.hospital === selectedHospital && doctor.specialty === selectedDepartment
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return ( 
        <div className="container appointment-box">

            <div className="dashboard-box">
                <div className="dashboard-item">
                    <h4>{totalHospitals}</h4>
                    <p>تعداد بیمارستان‌ها</p>
                </div>
                <div className="dashboard-item">
                    <h4>{totalDepartments}</h4>
                    <p>تعداد تخصص‌ها</p>
                </div>
                <div className="dashboard-item">
                    <h4>{totalDoctors}</h4>
                    <p>تعداد پزشکان آنکال</p>
                </div>
            </div>

            <div className="row">
                {/* فیلد جستجو بیمارستان */}
                <div className="col-md-4 custom-search-hospital">
                    <label className="form-label">جستجوی بیمارستان :</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="نام بیمارستان را وارد کنید..." 
                        value={searchHospital}
                        onChange={(e) => setSearchHospital(e.target.value)}
                    />
                </div>
                {/* فیلد جستجو تخصص */}
                <div className="col-md-4 custom-search-department">
                    <label className="form-label">جستجوی تخصص :</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="نام تخصص را وارد کنید..." 
                        value={searchDepartment}
                        onChange={(e) => setSearchDepartment(e.target.value)}
                        disabled={!selectedHospital}
                    />
                </div>
            </div>

            <div className="row justify-content-center mt-3 custom-input-select">

                <div className="col-md-4">
                    <label className="form-label">انتخاب بیمارستان :</label>
                    <select id='hospital' className="form-select" value={selectedHospital} 
                        onChange={(e) => {
                            setSelectedHospital(e.target.value);
                            setSelectedDepartment('');
                            }}>
                        <option value="">-- انتخاب بیمارستان --</option>
                        {hospitals.map((hospital) => (
                            <option key={hospital} value={hospital}>{hospital}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label">انتخاب تخصص :</label>
                    <select id='department' className="form-select" value={selectedDepartment} 
                        onChange={(e) => {
                            setSelectedDepartment(e.target.value);
                        }} 
                        disabled={!selectedHospital}>
                        <option value="">-- انتخاب تخصص --</option>
                        {selectedHospital && departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label">انتخاب تاریخ :</label>
                    <DatePicker
                        id='date'
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        calendar={persian}
                        locale={persian_fa}
                        format="YYYY/MM/DD"
                        className="form-control custom-date-picker"
                    />
                </div>

            </div>
            <div className="text-center mt-4">
                <button className="show-card-doctor" onClick={() => setSelectedDoctor(filteredDoctor)} disabled={!selectedDepartment}>
                    نمایش کارت پزشک 
                </button>
            </div>

            <div className={`overlay ${selectedDoctor ? 'show' : ''}`}>
                <div className="doctor-card overlay-card">
                    <button className="close-btn" onClick={() => setSelectedDoctor(null)} title='بستن'>
                        <FaTimes />
                    </button>
                    <img src={selectedDoctor?.avatar} alt={selectedDoctor?.name} className="doctor-image" />
                    <h4>{selectedDoctor?.name}</h4>
                    <p><FaUserMd /> تخصص : {selectedDoctor?.specialty}</p>
                    <p><FaHospital /> بیمارستان : {selectedDoctor?.hospital}</p>
                    <p><FaPhoneSquare /> شماره همراه : {selectedDoctor?.phone}</p>
                    <a href={`tel:${selectedDoctor?.phone}`} className="call-button">
                        <FaPhoneAlt /> تماس با پزشک
                    </a>
                </div>
            </div>

            <hr />            

            {/* نمایش کارت پزشک */}
            <div className="doctors-list">
                {doctors.map((doctor, index) => (
                    <div key={index} className="doctor-card">
                        <img src={doctor.avatar} alt={doctor.name} className="doctor-image" />
                        <h4>{doctor.name}</h4>
                        <p><FaUserMd /> تخصص : {doctor.specialty}</p>
                        <p><FaHospital /> بیمارستان : {doctor.hospital}</p>
                        <p><FaPhoneSquare /> شماره همراه : {doctor.phone}</p>
                        <a href={`tel:${doctor.phone}`} className="call-button">
                            <FaPhoneAlt /> تماس با پزشک
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};
 
export default AppointmentBox;