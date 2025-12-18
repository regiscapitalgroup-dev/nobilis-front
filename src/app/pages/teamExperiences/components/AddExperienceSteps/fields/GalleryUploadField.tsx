import React, { useRef } from "react";
import { useFormikContext } from "formik";
import { KTSVG, toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import { GalleryImagePreview } from "./GalleryImagePreview";

export default function GalleryUploadField() {
  const { values, setFieldValue } = useFormikContext();
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFiles = (files) => {
    const arr = Array.from(files);
    const onlyImages = arr.filter((f) => f.type.startsWith("image/"));
    setFieldValue("galleryImages", [...(values.galleryImages || []), ...onlyImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    const updated = values.galleryImages.filter((_, i) => i !== index);
    setFieldValue("galleryImages", updated);
  };

  return (
    <div className="w-100" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <div className={`tap-add-experience-2-upload-area tap-flex-center ${(values.galleryImages?.length > 0) ? 'd-none' : 'd-flex'}`} onClick={handleClick}>
        <div className="tap-flex-center flex-column">
          <div className="img-upload">
            <KTSVG className="img-upload" path={toAbsoluteUrl('/media/svg/nobilis/teams_and_partner/upload_icon.svg')} />
          </div>
          <div className="description">Drag your photo here or upload</div>
          <div className="btn_upload">UPLOAD IMAGE</div>
        </div>
      </div>
      {/* LISTA DE IMÁGENES */}
      <div className={`tap-add-experience-2-gallery-upload-container ${(values.galleryImages?.length > 0) ? 'd-flex' : 'd-none'}`}>
        <div className="tap-add-experience-2-gallery-upload-grid">
          {values.galleryImages?.map((img, index) => {
            const src = typeof img === 'string'
                ? img
                : URL.createObjectURL(img);

            return (<GalleryImagePreview key={index} src={src} file={img} onRemove={() => removeImage(index)} showDelete={!(typeof img === 'string')}/>);
          })}


          {/* BOTÓN DE SUBIR */}
          <div className="w-100 cursor-pointer">
            <div className="tap-add-experience-2-label-gallery-upload" onClick={handleClick}>upload more image</div>
          </div>
        </div>
      </div>

      {/* INPUT OCULTO */}
      <input type="file" multiple accept="image/*" style={{ display: "none" }} ref={inputRef} onChange={(e) => handleFiles(e.target.files)}/>
    </div>
  );
}
