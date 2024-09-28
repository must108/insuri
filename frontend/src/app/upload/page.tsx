"use client";

import UploadImage from "../components/upload/UploadImage";
import { useState } from 'react';

export default function Page() {
    const [file, setFile] = useState(null);
    const [retData, setRetData] = useState(null);
    const [retProba, setRetProba] = useState(null);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file!);
        console.log("formdata: ", formData);

        const res = await fetch(
            "http://127.0.0.1:5000/detect_damage", {
                method: "POST",
                body: formData,
            }
        );

        if (res.ok) {
            const data = await res.json();
            setRetData(data.predicted_damage);
            setRetProba(data.pred_proba);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <UploadImage func={handleFileChange} file={file} />

                <button type="submit"
                    className="bg-blue-700 hover:bg-blue-900
                    text-white px-3 py-1 rounded font-bold
                    transition delay-50"
                    data-testid="upload-button"
                    >
                    upload
                </button>
            </form>
            <div className="text-black">
                {retData ? retData : null}
                {retProba ? retProba : null}
            </div>
        </div>
    );
}