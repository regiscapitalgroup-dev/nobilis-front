import React from "react"

export function GalleryImagePreview({
    showDelete,
    src,
    file,
    onRemove,
}: {
    showDelete: boolean
    src: string
    file: File | string
    onRemove: () => void
}) {
    React.useEffect(() => {
        return () => {
            if (file instanceof File) {
                URL.revokeObjectURL(src)
            }
        }
    }, [file, src])

    return (
        <div className="tap-add-experience-2-gallery-card">
            <img src={src} alt="" className="tap-add-experience-2-gallery-card__img"/>
            {showDelete && (<button type="button" className="tap-add-experience-2-gallery-card__remove" onClick={onRemove}>
                ×
            </button>)}
        </div>
    )
}
