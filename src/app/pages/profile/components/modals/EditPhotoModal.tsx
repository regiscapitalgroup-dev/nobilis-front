import React, {useState, useRef, useEffect} from 'react'

type Props = {
  photo: string
  initialValues?: {
    brightness: number
    contrast: number
    zoom: number
    straighten: number
  }
  onClose: () => void
  onConfirm: (edited: string, values: any) => void
}

export default function EditPhotoModal({
  photo,
  initialValues = {brightness: 100, contrast: 100, zoom: 1, straighten: 0},
  onClose,
  onConfirm,
}: Props) {
  const [activeTab, setActiveTab] = useState<'crop' | 'filter'>('crop')
  const [brightness, setBrightness] = useState(initialValues.brightness)
  const [contrast, setContrast] = useState(initialValues.contrast)
  const [zoom, setZoom] = useState(initialValues.zoom)
  const [straighten, setStraighten] = useState(initialValues.straighten)
  const [originalDimensions, setOriginalDimensions] = useState({width: 0, height: 0})
  const imageRef = useRef<HTMLImageElement>(null)

  // Obtener dimensiones originales de la imagen
  useEffect(() => {
    const img = new Image()
    img.src = photo
    img.onload = () => {
      setOriginalDimensions({width: img.width, height: img.height})
    }
  }, [photo])

  useEffect(() => {
    setBrightness(initialValues.brightness)
    setContrast(initialValues.contrast)
    setZoom(initialValues.zoom)
    setStraighten(initialValues.straighten)
  }, [initialValues]) 

  const applyEdits = () => {
    const img = new Image()
    img.src = photo
    img.onload = () => {
      // Crear canvas con las dimensiones originales
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      canvas.width = img.width
      canvas.height = img.height

      // Llenar con fondo transparente
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Aplicar todas las transformaciones
      ctx.save()
      
      // Mover al centro de la imagen
      ctx.translate(canvas.width / 2, canvas.height / 2)
      
      // Aplicar rotación (convertir grados a radianes)
      ctx.rotate((straighten * Math.PI) / 180)
      
      // Aplicar zoom
      ctx.scale(zoom, zoom)
      
      // Aplicar filtros de brillo y contraste
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`
      
      // Dibujar la imagen centrada con todas las transformaciones aplicadas
      ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height)
      
      ctx.restore()

      // Exportar imagen con todas las transformaciones aplicadas
      const editedImage = canvas.toDataURL('image/jpeg', 0.9)
      const currentValues = {brightness, contrast, zoom, straighten}
      onConfirm(editedImage, currentValues)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-title">Edit photo</div>

        <div className="editor-body">
          {/* Columna izquierda (imagen) */}
          <div className="image-container">
            <img
              ref={imageRef}
              src={photo}
              alt="edit"
              className="editable-photo"
              style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                transform: `scale(${zoom}) rotate(${straighten}deg)`,
              }}
            />
            <div className="image-frame-overlay" />
          </div>

          {/* Columna derecha (controles) */}
          <div className="controls-container">
            <div className="controls-top">
              <div className="tabs">
                <div
                  className={`tab ${activeTab === 'crop' ? 'active' : ''}`}
                  onClick={() => setActiveTab('crop')}
                >
                  Crop
                </div>
                <div
                  className={`tab ${activeTab === 'filter' ? 'active' : ''}`}
                  onClick={() => setActiveTab('filter')}
                >
                  Filter
                </div>
              </div>

              <div className="sliders">
                {activeTab === 'crop' && (
                  <>
                    <div className="rotate-controls">
                      <img
                        src="/media/svg/nobilis/rotate-left.svg"
                        alt="rotate left"
                        className="rotate-icon"
                        onClick={() => setStraighten(straighten - 90)}
                      />
                      <img
                        src="/media/svg/nobilis/rotate-right.svg"
                        alt="rotate right"
                        className="rotate-icon"
                        onClick={() => setStraighten(straighten + 90)}
                      />
                    </div>

                    <div className="slider-group">
                      <div className="slider-label">
                        Zoom
                       
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.01"
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                      />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label">
                        Straighten
                       
                      </div>
                      <input
                        type="range"
                        min="-45"
                        max="45"
                        step="1"
                        value={straighten}
                        onChange={(e) => setStraighten(Number(e.target.value))}
                      />
                    </div>
                  </>
                )}

                {activeTab === 'filter' && (
                  <>
                    <div className="slider-group">
                      <div className="slider-label">Brightness</div>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                      />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label">Contrast</div>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={contrast}
                        onChange={(e) => setContrast(Number(e.target.value))}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="buttons">
              <button className="cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="confirm" onClick={applyEdits}>
                <span>Confirm</span>
                <img
                  src="/media/svg/nobilis/vector1.svg"
                  alt=""
                  className="nb-btn-icon nb-btn-icon--white"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}