import React, {useState, useRef} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import EditPhotoModal from '../modals/EditPhotoModal'
import {useHistory} from 'react-router-dom'

type Props = {
  initialData: any
  onSubmit: (data: any) => void
  onBack: () => void
}

const Step2Schema = Yup.object().shape({
  photo: Yup.mixed().required('Photo is required'),
})

export default function ProfileStep2({initialData, onSubmit, onBack}: Props) {
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useHistory()
  const [editValues, setEditValues] = useState({
    brightness: 100,
    contrast: 100,
    zoom: 1,
    straighten: 0,
  })
  const [loading, setLoading] = useState(false)

  const handleFinishClick = async () => {
    try {
      setLoading(true)
      await onSubmit({photo: selectedPhoto})
      navigate.push('/biography')

    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedPhoto(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleSubmit = (values: any) => {
    const formData = {
      ...values,
      photo: selectedPhoto,
    }
    onSubmit(formData)
  }

  const exampleImages = ['/media/people3.png', '/media/people2.png', '/media/people1.png']

  return (
    <>
      <Formik
        initialValues={{
          photo: initialData.photo || null,
        }}
        validationSchema={Step2Schema}
        onSubmit={handleSubmit}
      >
        {() => (
          <div className='profile-step2-container'>
            <div className='profile-step2-content'>
              {/* Upload Section */}
              <div className='photo-upload-section'>
                <div className='photo-upload-group'>
                  <label className='photo-upload-label'>Upload Photo</label>

                  {photoPreview ? (
                    <>
                      <div className='photo-preview-container'>
                        {/* Imagen subida */}
                        <img src={photoPreview} alt='Preview' className='photo-preview' />

                        {/* Botón editar */}
                        <button
                          type='button'
                          className='photo-edit-btn'
                          onClick={() => setShowEditModal(true)}
                        >
                          <KTSVG
                            path={toAbsoluteUrl('/media/svg/nobilis/edit.svg')}
                            className='svg-icon-1'
                          />
                        </button>
                      </div>

                      {/* Acciones debajo */}
                      <div className='photo-actions'>
                        <button
                          type='button'
                          className='action-btn'
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Change Photo
                        </button>
                        <button
                          type='button'
                          className='action-btn'
                          onClick={() => {
                            setSelectedPhoto(null)
                            setPhotoPreview(null)
                          }}
                        >
                          Remove Photo
                        </button>
                      </div>
                    </>
                  ) : (
                    <div
                      className='photo-upload-area'
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className='photo-upload-placeholder'>
                        <KTSVG
                          path={toAbsoluteUrl('/media/svg/nobilis/upload_file.svg')}
                          className='svg-icon-1'
                        />
                        <div className='upload-text'>Drag your photo here or</div>
                        <div className='upload-button'>
                          <span>upload</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/jpeg,image/png'
                    onChange={handleFileInputChange}
                    style={{display: 'none'}}
                  />
                </div>
              </div>

              {/* Examples Section */}
              <div className='photo-examples-section'>
                <div className='examples-group'>
                  <label className='examples-label'>Example</label>
                  <div className={`examples-images ${showEditModal ? 'bw-all' : ''}`}>
                    {exampleImages.map((src, index) => (
                      <div key={index} className={`example-image ${index === 1 ? 'bw' : ''}`}>
                        <img src={toAbsoluteUrl(src)} alt={`Example ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className='photo-requirements'>
                  {/* Columna izquierda */}
                  <div className='requirements-left'>
                    <div className='requirement-row'>
                      <div className='check-icon'>✓</div>
                      <span>High-resolution, professional headshot</span>
                    </div>
                    <div className='requirement-row'>
                      <div className='check-icon'>✓</div>
                      <span>Clear focus on face</span>
                    </div>
                    <div className='requirement-row'>
                      <div className='check-icon'>✓</div>
                      <span>Neutral or calm background with proper lighting</span>
                    </div>
                  </div>

                  {/* Columna derecha */}
                  <div className='requirements-right'>
                    <div className='requirement-row'>
                      <div className='check-icon'>✓</div>
                      <span>Recent image</span>
                    </div>
                    <div className='requirement-row'>
                      <div className='check-icon'>✓</div>
                      <span>Format: JPEG/PNG, max 5MB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className='step2-navigation'>
              <button type='button' onClick={onBack} className='back-button'>
                <span>back</span>
              </button>

              {/* <button type='submit' onClick={() => handleSubmit({})} className='finish-button'>
                <span>finish</span>
                <img
                  src='/media/svg/nobilis/vector1.svg'
                  alt=''
                  className='nb-btn-icon nb-btn-icon--black'
                />
              </button> */}
              <button
                type='button'
                onClick={handleFinishClick}
                className='finish-button'
                disabled={loading}
              >
                {!loading ? (
                  <>
                    <span>finish</span>
                    <img
                      src='/media/svg/nobilis/vector1.svg'
                      alt=''
                      className='nb-btn-icon nb-btn-icon--black'
                    />
                  </>
                ) : (
                  <span className='indicator-progress nb-heading-md'>
                    Please wait...
                    <span
                      className='spinner-border spinner-border-sm align-middle ms-2'
                      role='status'
                      aria-hidden='true'
                    />
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </Formik>

      {showEditModal && photoPreview && (
        <EditPhotoModal
          photo={photoPreview}
          initialValues={editValues}
          onClose={() => setShowEditModal(false)}
          onConfirm={(edited, values) => {
            setPhotoPreview(edited)
            /* setEditValues(values) */
            setEditValues({brightness: 100, contrast: 100, zoom: 1, straighten: 0})
            setShowEditModal(false)
          }}
        />
      )}
    </>
  )
}
