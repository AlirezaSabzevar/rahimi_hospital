
import { useState } from "react";
import { FaSearch, FaUserMd, FaHospital, FaPhoneAlt, FaTimes } from "react-icons/fa";
import "./searchdoctor.css";

const doctorsList = [
    {id: 1, name:'دکتر عنبری', hospital:'بیمارستان رحیمی', specialty:'اطفال', phone:'09122630593', avatar: require('../Images/3774299.png')},
    {id: 2, name:'دکتر مالکی', hospital:'بیمارستان رحیمی', specialty:'گوارش', phone:'09125890593', avatar: require('../Images/3774299.png')},
    {id: 3, name:'دکتر عبدالهی', hospital:'بیمارستان رحیمی', specialty:'قلب', phone:'09121230593', avatar: require('../Images/3774299.png')},
    {id: 4, name:'دکتر بهرامی', hospital:'بیمارستان رحیمی', specialty:'نوزادان', phone:'09120760593', avatar: require('../Images/3774299.png')},
    {id: 5, name:'دکتر صالحی', hospital:'بیمارستان مدنی', specialty:'قلب', phone:'09389875048', avatar: require('../Images/3774299.png')},
    {id: 6, name:'دکتر قاسمی', hospital:'بیمارستان عشایر', specialty:'جراحی', phone:'09186393625', avatar: require('../Images/3774299.png')},
    {id: 7, name:'دکتر احمدی', hospital:'بیمارستان سینا', specialty:'مغز و اعصاب', phone:'09187873625', avatar: require('../Images/3774299.png')},
    {id: 8, name:'دکتر شفیعی', hospital:'بیمارستان شفا', specialty:'آنکولوژی', phone:'09182583625', avatar: require('../Images/3774299.png')},
];

const SearchDoctor = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query) {
            const results = doctorsList.filter((doctor) =>
                doctor.name.toLowerCase().includes(query) ||
                doctor.specialty.toLowerCase().includes(query) ||
                doctor.hospital.toLowerCase().includes(query)
            );
            setFilteredDoctors(results);
        } else {
            setFilteredDoctors([]);
        }
    };

    return (
        <div className="search-doctor-container">
            <h3>جستوجوی پیشرفته پزشک آنکال</h3>
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder=" جستجوی پزشک ، تخصص یا بیمارستان ..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {filteredDoctors.length > 0 && (
                <div className="search-results">
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="doctor-item" onClick={() => setSelectedDoctor(doctor)}>
                            <img src={doctor.avatar} alt={doctor.name} className="doctor-avatar" />
                            <div>
                                <h4>{doctor.name}</h4>
                                <p><FaUserMd /> {doctor.specialty}</p>
                                <p><FaHospital /> {doctor.hospital}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedDoctor && (
                <div className="overlay show">
                    <div className="doctor-card overlay-card">
                        <button className="close-btn" onClick={() => setSelectedDoctor(null)}><FaTimes/></button>
                        <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="doctor-image" />
                        <h4>{selectedDoctor.name}</h4>
                        <p><FaUserMd /> تخصص : {selectedDoctor.specialty}</p>
                        <p><FaHospital /> بیمارستان : {selectedDoctor.hospital}</p>
                        <p><FaPhoneAlt /> شماره همراه : {selectedDoctor.phone}</p>
                        <a href={`tel:${selectedDoctor.phone}`} className="call-button">تماس با پزشک</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchDoctor;
