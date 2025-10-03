import { FC, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TeamModel } from "../models/TeamModel";

interface Props {
  initialValues: Partial<TeamModel>;
  onSubmit: (values: Partial<TeamModel>) => Promise<void>;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
});

const TeamForm: FC<Props> = ({ initialValues, onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="team-form">
      <h2 className="team-form__title">My Team</h2>

      <Formik
        initialValues={{
          name: initialValues.name || "",
          surname: initialValues.surname || "",
          email: initialValues.email || "",
          phone: initialValues.phone || "",
          relation: initialValues.relation || "",
          organization: initialValues.organization || "",
          assignments: initialValues.assignments || [],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            setLoading(true);
            await onSubmit(values);
            resetForm();
          } finally {
            setLoading(false);
          }
        }}
      >
        {() => (
          <Form className="team-form__container">
            <h3 className="team-form__subtitle">Add new team member</h3>

            {/* Campos */}
            <div className="team-form__row">
              <div className="team-form__field">
                <label>Name</label>
                <Field name="name" className="team-form__input" />
              </div>
              <div className="team-form__field">
                <label>Surname</label>
                <Field name="surname" className="team-form__input" />
              </div>
            </div>

            <div className="team-form__row">
              <div className="team-form__field">
                <label>Relation</label>
                <Field name="relation" className="team-form__input" />
              </div>
              <div className="team-form__field">
                <label>Organization</label>
                <Field name="organization" className="team-form__input" />
              </div>
            </div>

            <div className="team-form__row">
              <div className="team-form__field">
                <label>Phone Number</label>
                <Field name="phone" className="team-form__input" />
              </div>
              <div className="team-form__field">
                <label>Email</label>
                <Field name="email" className="team-form__input" />
              </div>
            </div>

            {/* Asignaciones */}
            <div className="team-form__assignments">
              <label>Assignment</label>
              <div className="team-form__checkbox-group">
                {[
                  "Administrator",
                  "Profile Management",
                  "Experience Management",
                  "Calendar Management",
                  "Mastermind Circle Management",
                ].map((assignment) => (
                  <label key={assignment}>
                    <Field type="checkbox" name="assignments" value={assignment} />
                    {assignment}
                  </label>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="team-form__actions">
              <button
                type="button"
                className="team-form__btn team-form__btn--secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn nb-btn-primary"
                disabled={loading}
                aria-busy={loading}
              >
                {!loading ? (
                  <>
                    <span className="nb-heading-md">save changes</span>
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
    </div>
  );
};

export default TeamForm;
