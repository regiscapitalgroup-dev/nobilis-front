import { FC, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ReferenceModel } from "../models/ReferencesModel";
import { createReference } from "../../../services/referencesService";
import ReferencesCard from "./ReferencesCard";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  qualifications: Yup.string().required("Required"),
});

const ReferencesForm: FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="references-form">
      <h2 className="references-form__title">Refer a Member</h2>
      <p className="references-form__subtitle">
        When you refer someone to Nobilis, the invited individual will be reviewed.
        Once approved by the Nobilis Members Committee and after they accept and pay
        the initiation fee, you will receive platform credits following their onboarding:
        750 (HA), 1500 (UHA), or 3000 (LT), depending on their membership tier.
        <br />
        <br />
        HA=High Achiever, UHA=Ultra High Achiever, LT=Legacy Tier
      </p>

      <Formik
        initialValues={{
          name: "",
          surname: "",
          phone: "",
          email: "",
          qualifications: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            setLoading(true);
            await createReference(values as ReferenceModel);
            resetForm();
          } catch (err) {
            console.error("Error creating reference:", err);
          } finally {
            setLoading(false);
          }
        }}
      >
        {() => (
          <Form className="references-form__container">
            <div className="references-form__row">
              <div className="references-form__field">
                <label>Name</label>
                <Field name="name" className="references-form__input" />
              </div>
              <div className="references-form__field">
                <label>Surname</label>
                <Field name="surname" className="references-form__input" />
              </div>
            </div>

            <div className="references-form__row">
              <div className="references-form__field">
                <label>Phone Number</label>
                <Field name="phone" className="references-form__input" />
              </div>
              <div className="references-form__field">
                <label>Email</label>
                <Field name="email" className="references-form__input" />
              </div>
            </div>

            <div className="references-form__row">
              <div className="references-form__field">
                <label>Select Invitee Qualifications</label>
                <Field
                  as="textarea"
                  name="qualifications"
                  placeholder='e.g. "Family office strategy", "Dialogue on investment & innovation"'
                  className="references-form__input"
                />
              </div>
            </div>

            <div className="references-form__actions">
              <button
                type="submit"
                className="btn nb-btn-primary"
                disabled={loading}
                aria-busy={loading}
              >
                {!loading ? (
                  <>
                    <span className="nb-heading-md">refer a member</span>
                    <img
                      src="/media/svg/nobilis/vector1.svg"
                      alt=""
                      className="nb-btn-icon nb-btn-icon--white"
                    />
                  </>
                ) : (
                  <span className="indicator-progress nb-heading-md">
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2" />
                  </span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Cards con calificaciones */}
      <div className="references-form__cards">
        <ReferencesCard/>
      </div>
    </div>
  );
};

export default ReferencesForm;
