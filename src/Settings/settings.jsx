import { useState, useEffect } from "react";
import Switch from "react-switch";
import { motion } from "framer-motion";
import { FaMoon, FaSun, FaBell, FaLock, FaRedo, FaDownload, FaCogs } from "react-icons/fa";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./settings.css";



const Settings = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [notifications, setNotifications] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.style.backgroundColor = newTheme === "dark" ? "#222" : "#f8f8f8";
    setDarkMode(!darkMode);
  };


  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);


  const handleReset = () => {
    setNotifications(true);
    // اینجا اگر تنظیمات دیگری اضافه شد، برگردون به حالت اولیه
  };


  const handlePasswordChange = () => {
    setError("");
    setSuccess("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("رمز جدید و تکرار آن یکسان نیستند.");
      return;
    }

    if (newPassword.length < 6) {
      setError("رمز جدید باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    // اینجا می‌تونی کد ارسال به بک‌اند رو قرار بدی
    setSuccess("رمز عبور با موفقیت تغییر کرد.");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };



  const doctorsData = [
    {
      id: 1,
      name: "دکتر علی رضایی",
      specialty: "قلب",
      phone: "09123456789",
      hospital: "بیمارستان شهید رجایی",
      date: "1403/01/29"
    },
    {
      id: 2,
      name: "دکتر نسرین محمدی",
      specialty: "داخلی",
      phone: "09361234567",
      hospital: "بیمارستان امام خمینی",
      date: "1403/01/30"
    }
  ];


  const handleBackup = () => {
    const blob = new Blob([JSON.stringify(doctorsData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "doctors-backup.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  const BackupDoctors = () => {
    // دیتای نمونه (می‌تونی بعداً به دیتابیس متصلش کنی)
    const doctorData = [
      {name:'دکتر عنبری', hospital:'بیمارستان شهید رحیمی', specialty:'اطفال', phone:'09122630593', avatar: require('../Images/3774299.png')},
      {name:'دکتر مالکی', hospital:'بیمارستان رحیمی', specialty:'گوارش', phone:'09125890593', avatar: require('../Images/3774299.png')},
      {name:'دکتر عبدالهی', hospital:'بیمارستان رحیمی', specialty:'قلب', phone:'09121230593', avatar: require('../Images/3774299.png')},
      {name:'دکتر بهرامی', hospital:'بیمارستان رحیمی', specialty:'نوزادان', phone:'09120760593', avatar: require('../Images/3774299.png')},
      {name:'دکتر صالحی', hospital:'بیمارستان مدنی', specialty:'قلب', phone:'09389875048', avatar: require('../Images/3774299.png')},
      {name:'دکتر قاسمی', hospital:'بیمارستان عشایر', specialty:'جراحی', phone:'09186393625', avatar: require('../Images/3774299.png')},
      {name:'دکتر احمدی', hospital:'بیمارستان سینا', specialty:'مغز و اعصاب', phone:'09187873625', avatar: require('../Images/3774299.png')},
      {name:'دکتر شفیعی', hospital:'بیمارستان فوق تخصصی شفا', specialty:'آنکولوژی', phone:'09182583625', avatar: require('../Images/3774299.png')},
    ];

    const headers = [
        { label: "نام پزشک", key: "name" },
        { label: "تخصص", key: "specialty" },
        { label: "بیمارستان", key: "hospital" },
        { label: "شماره تماس", key: "phone" }
    ];

    return (
        <div className="settings-section">
            <h4>📤 پشتیبان‌گیری از اطلاعات</h4>
            <CSVLink data={doctorData} headers={headers} filename="doctors-backup.csv" className="backup-btn">
                دانلود فایل CSV
            </CSVLink>
        </div>
    );
  };
  <BackupDoctors />





  const ExportToExcel = () => {
    const doctorData = [
      {name:'دکتر عنبری', hospital:'بیمارستان شهید رحیمی', specialty:'اطفال', phone:'09122630593', avatar: require('../Images/3774299.png')},
      {name:'دکتر مالکی', hospital:'بیمارستان رحیمی', specialty:'گوارش', phone:'09125890593', avatar: require('../Images/3774299.png')},
      {name:'دکتر عبدالهی', hospital:'بیمارستان رحیمی', specialty:'قلب', phone:'09121230593', avatar: require('../Images/3774299.png')},
      {name:'دکتر بهرامی', hospital:'بیمارستان رحیمی', specialty:'نوزادان', phone:'09120760593', avatar: require('../Images/3774299.png')},
      {name:'دکتر صالحی', hospital:'بیمارستان مدنی', specialty:'قلب', phone:'09389875048', avatar: require('../Images/3774299.png')},
      {name:'دکتر قاسمی', hospital:'بیمارستان عشایر', specialty:'جراحی', phone:'09186393625', avatar: require('../Images/3774299.png')},
      {name:'دکتر احمدی', hospital:'بیمارستان سینا', specialty:'مغز و اعصاب', phone:'09187873625', avatar: require('../Images/3774299.png')},
      {name:'دکتر شفیعی', hospital:'بیمارستان فوق تخصصی شفا', specialty:'آنکولوژی', phone:'09182583625', avatar: require('../Images/3774299.png')},
    ];

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(doctorData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Doctors");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(file, "doctors-backup.xlsx");
    };

    return (
        <div className="settings-section">
            <h4>📁 خروجی اکسل</h4>
            <button onClick={handleExport} className="excel-btn">
                دانلود فایل Excel
            </button>
        </div>
    );
  };
  <ExportToExcel />














  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="settings-container"
    >
      <h2><FaCogs /> تنظیمات</h2>

      {/* تنظیمات تم */}
      <div className="setting-item">

        <span>🌗 تم سایت</span>

        <div className="toggle-container">
          <FaMoon className={`icon ${darkMode ? "active" : ""}`} />
          <Switch
            onChange={toggleTheme}
            checked={darkMode}
            onColor="#4A90E2"
            offColor="#ddd"
            uncheckedIcon={false}
            checkedIcon={false}
            height={24}
            width={48}
            handleDiameter={20}
          />
          <FaSun className={`icon ${!darkMode ? "active" : ""}`} />
        </div>
      </div>
        
      <div className="section-header"><FaBell /> اعلان‌ها</div>
      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          {notifications ? "اعلان‌ها فعال هستند" : "اعلان‌ها غیرفعال شده‌اند"}
        </label>
      </div>

      <div className="setting-actions">
        <button className="change-password-btn" onClick={() => setShowPasswordForm(!showPasswordForm)}>
          <FaLock /> تغییر رمز عبور
        </button>
        <button className="backup-btn" onClick={handleBackup}>
          <FaDownload /> پشتیبان‌گیری از اطلاعات
        </button>
        <button className="reset-btn" onClick={handleReset}>
          <FaRedo /> بازگردانی پیش‌فرض‌ها
        </button>
      </div>
      


      {showPasswordForm && (
        <div className="password-form">
          <input
            type="password"
            placeholder="رمز عبور فعلی"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="رمز عبور جدید"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="تکرار رمز جدید"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>ذخیره تغییرات</button>
          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}
        </div>
      )}

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="save-btn">
        ذخیره تغییرات
      </motion.button>
    </motion.div>
  );
};

export default Settings;
