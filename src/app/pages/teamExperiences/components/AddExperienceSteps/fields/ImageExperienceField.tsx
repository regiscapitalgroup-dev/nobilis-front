import React, { useEffect, useRef, useState } from "react";
import { useFormikContext } from "formik";
import { KTSVG, toAbsoluteUrl } from "../../../../../../_metronic/helpers";

export default function ImageExperienceField() {
  const { setFieldValue, values } = useFormikContext();
  const inputRef = useRef(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!values.imageCover) {
      setPreview(null);
      return;
    }

    // Si ya es una URL (editar)
    if (typeof values.imageCover === 'string') {
      setPreview(values.imageCover);
      return;
    }

    // Si es File (create o change)
    const objectUrl = URL.createObjectURL(values.imageCover);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [values.imageCover]);

  // Cuando el usuario hace click
  const handleClick = () => {
    inputRef.current.click();
  };

  // Cuando selecciona imagen
  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    setFieldValue("imageCover", file);
  };

  const removeImage = () => {
    setPreview(null);
    setFieldValue("imageCover", null);
  };

  // Drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (<>
      <div className={`tap-add-experience-2-upload-area tap-flex-center ${preview ? 'd-none' : 'd-flex'}`} onClick={handleClick}>
        <div className="tap-flex-center flex-column">
          <div className="img-upload">
            <KTSVG className="img-upload" path={toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/upload_icon.svg')} />
          </div>
          <div className="description">Drag your photo here or upload</div>
          <div className="btn_upload">UPLOAD IMAGE</div>
        </div>
      </div>
      <div className={`tap-add-experience-2-upload-area ${preview ? 'd-flex' : 'd-none'}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          backgroundImage: preview ? `url(${preview})` : "none",
        }}>
        {!preview && (
          <div className="upload-placeholder">
            {/* Click or drag an image here */}
          </div>
        )}
        <input type="file" ref={inputRef} style={{ display: "none" }} accept="image/*" onChange={(e) => handleFile(e.target.files[0])}/>
      </div>
      <div className={`tap-image-actions ${preview ? 'd-flex' : 'd-none'}`}>
        <div className="tap-image-actions__item" onClick={removeImage}>
          <div className="tap-image-actions__label">remove image</div>
        </div>
        <div className="tap-image-actions__item" onClick={handleClick}>
          <div className="tap-image-actions__label">change image</div>
        </div>
      </div>
    </>
  );
}

/* 

*/