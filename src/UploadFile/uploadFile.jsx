import './uploadFile.css';
import { useState, useEffect } from "react";
// import { useFileStore } from "../store";
// import { useNavigate } from "react-router-dom";
import { useThemeStore } from '../store';


const UploadHospitalSchedule = ({ onFileUpload }) => {

    const {theme} = useThemeStore();
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadStatus("");
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("لطفاً یک فایل انتخاب کنید.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            // این قسمت باید به API واقعی متصل شود تا فایل پردازش و اطلاعات به‌روز شود
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                onFileUpload(result.data);
                setUploadStatus("فایل با موفقیت آپلود شد.");
            } else {
                setUploadStatus("خطا در آپلود فایل.");
            }
        } catch (error) {
            setUploadStatus("مشکلی در آپلود فایل پیش آمد.");
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);



    return (
        <div className="upload-component">
            <h2>آپلود برنامه ماهانه پزشکان آنکال بیمارستان</h2>
            <div className="upload-container">
                <h3>.برنامه‌ی آنکالی بیمارستان خود را آپلود کنید</h3>
                <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.xls,.xlsx" />
                <button onClick={handleUpload}>آپلود</button>
                {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
            </div>
        </div>
    );
};

export default UploadHospitalSchedule;
