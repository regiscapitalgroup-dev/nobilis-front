import { Formik, Form, Field } from "formik";

export default function ProfessionalOverviewForm() {
  return (
    <Formik
      initialValues={{
        organization: "",
        role: "",
        city: "",
        currentRole: false,
        from: "",
        to: "",
        website: "",

        boardOrganization: "",
        boardRole: "",
        boardCity: "",
        boardCurrent: false,
        boardFrom: "",
        boardTo: "",
        boardWebsite: "",

        nonprofitOrganization: "",
        nonprofitRole: "",
        nonprofitCity: "",
        nonprofitCurrent: false,
        nonprofitFrom: "",
        nonprofitTo: "",
        nonprofitWebsite: "",

        eduOrganization: "",
        eduRole: "",
        eduCity: "",
        eduCurrent: false,
        eduFrom: "",
        eduTo: "",
        eduWebsite: "",

        industries: [],
        interests: [],
      }}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form className="pf-form">
          {/* Header */}
          <div className="pf-header">Edit Your Professional Overview</div>

          {/* Organizations */}
          <div className="pf-section">
            <div className="pf-section__title">
              Organizations I am involve in / Positions
            </div>
            <div className="pf-section__desc">
              Please list all relevant organizations you’d like to showcase in
              your profile, both current and past.
            </div>

            <div className="pf-fields">
              <div className="pf-row">
                <div className="pf-field">
                  <label className="pf-label">Organization</label>
                  <Field name="organization" className="pf-input" />
                </div>
                <div className="pf-field">
                  <label className="pf-label">Role</label>
                  <Field name="role" className="pf-input" />
                </div>
              </div>

              <div className="pf-field">
                <label className="pf-label">City</label>
                <Field name="city" className="pf-input" />
              </div>

              <div className="pf-checkbox">
                <Field type="checkbox" name="currentRole" className="pf-check" />
                <span>I am currently serving in this role</span>
              </div>

              <div className="pf-row">
                <div className="pf-field">
                  <label className="pf-label">From</label>
                  <Field type="date" name="from" className="pf-input" />
                </div>
                <div className="pf-field">
                  <label className="pf-label">To</label>
                  <Field type="date" name="to" className="pf-input" />
                </div>
              </div>

              <div className="pf-field">
                <label className="pf-label">Website url</label>
                <Field name="website" className="pf-input" />
              </div>
            </div>
            <div className="pf-add">+ Add more</div>
          </div>

          {/* Board */}
          <div className="pf-section">
            <div className="pf-section__title">I am on board</div>
            <div className="pf-section__desc">List all relevant organizations</div>

            <div className="pf-fields">
              <div className="pf-row">
                <div className="pf-field">
                  <label className="pf-label">Organization</label>
                  <Field name="boardOrganization" className="pf-input" />
                </div>
                <div className="pf-field">
                  <label className="pf-label">Role</label>
                  <Field name="boardRole" className="pf-input" />
                </div>
              </div>

              <div className="pf-field">
                <label className="pf-label">City</label>
                <Field name="boardCity" className="pf-input" />
              </div>

              <div className="pf-checkbox">
                <Field type="checkbox" name="boardCurrent" className="pf-check" />
                <span>I am currently serving in this role</span>
              </div>

              <div className="pf-row">
                <div className="pf-field">
                  <label className="pf-label">From</label>
                  <Field type="date" name="boardFrom" className="pf-input" />
                </div>
                <div className="pf-field">
                  <label className="pf-label">To</label>
                  <Field type="date" name="boardTo" className="pf-input" />
                </div>
              </div>

              <div className="pf-field">
                <label className="pf-label">Website url</label>
                <Field name="boardWebsite" className="pf-input" />
              </div>
            </div>
            <div className="pf-add">+ Add more</div>
          </div>

          {/* Nonprofit */}
          <div className="pf-section">
            <div className="pf-section__title">
              Do you lead a nonprofit or charitable organization that you
              established or support?
            </div>

            <div className="pf-fields">
              <div className="pf-row">
                <div className="pf-field">
                  <label className="pf-label">Organization</label>
                  <Field name="nonprofitOrganization" className="pf-input" />
                </div>
                <div className="pf-field">
                  <label className="pf-label">Role</label>
                  <Field name="nonprofitRole" className="pf-input" />
                </div>
              </div>

              <div className="pf-field">
                <label className="pf-label">City</label>
                <Field name="nonprofitCity" className="pf-input" />
              </div>

              <div className="pf-checkbox">
                <Field
                  type="checkbox"
                  name="nonprofitCurrent"
                  className="pf-check"
                />
                <span>I am currently serving in this role</span>
              </div>

              <div className="pf-row">
                <div className="pf-field">
                  <label className="pf-label">From</label>
                  <Field type="date" name="nonprofitFrom" className="pf-input" />
                </div>
                <div className="pf-field">
                  <label className="pf-label">To</label>
                  <Field type="date" name="nonprofitTo" className="pf-input" />
                </div>
              </div>

              <div className="pf-field">
                <label className="pf-label">Website url</label>
                <Field name="nonprofitWebsite" className="pf-input" />
              </div>
            </div>
            <div className="pf-add">+ Add more</div>
          </div>

          {/* Education */}
          <div className="pf-section">
            <div className="pf-section__title">Education</div>
            <div className="pf-section__desc">
              List all relevant universities and educational institutions.
            </div>

            <div className="pf-fields">
              <div className="pf-row">
                <div className="pf-field">
                  <label className="pf-label">Organization</label>
                  <Field name="eduOrganization" className="pf-input" />
                </div>
                <div className="pf-field">
                  <label className="pf-label">Role</label>
                  <Field name="eduRole" className="pf-input" />
                </div>
              </div>

              <div className="pf-field">
                <label className="pf-label">City</label>
                <Field name="eduCity" className="pf-input" />
              </div>

              <div className="pf-checkbox">
                <Field type="checkbox" name="eduCurrent" className="pf-check" />
                <span>I am currently studying</span>
              </div>

              <div className="pf-row">
                <div className="pf-field">
                  <label className="pf-label">From</label>
                  <Field type="date" name="eduFrom" className="pf-input" />
                </div>
                <div className="pf-field">
                  <label className="pf-label">To</label>
                  <Field type="date" name="eduTo" className="pf-input" />
                </div>
              </div>

              <div className="pf-field">
                <label className="pf-label">Website url</label>
                <Field name="eduWebsite" className="pf-input" />
              </div>
            </div>
            <div className="pf-add">+ Add more</div>
          </div>

          {/* Industries */}
          <div className="pf-section">
            <div className="pf-section__title">
              What industries do you have expertise in?
            </div>
            <div className="pf-field">
              <label className="pf-label">Select relevant industries</label>
              <Field as="select" name="industries" multiple className="pf-input">
                <option value="finance">Finance</option>
                <option value="food">Food & Beverage</option>
                <option value="health">Health Care</option>
              </Field>
            </div>
          </div>

          {/* Interests */}
          <div className="pf-section">
            <div className="pf-section__title">
              Please indicate your key Professional Interests
            </div>
            <div className="pf-section__desc italic">Select all that apply</div>
            <div className="pf-interests">
              {[
                "Entrepreneurship",
                "Government",
                "Legacy Building",
                "Career Change",
                "Investments",
                "Mentorship",
                "Philanthropy",
                "Professional Growth",
              ].map((interest) => (
                <label key={interest} className="pf-chip">
                 {/*  <Field
                    type="checkbox"
                    name="interests"
                    value={interest}
                    className="pf-check"
                  /> */}
                  {interest}
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pf-actions">
            <button type="reset" className="pf-btn pf-btn--cancel">
              Cancel
            </button>
            <button type="submit" className="pf-btn pf-btn--save">
              Save changes
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
