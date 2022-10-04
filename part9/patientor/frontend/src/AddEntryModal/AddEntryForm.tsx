import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import moment from "moment";

import {
  TextField,
  SelectField,
  HealthCheckRatingOption,
  DiagnosisSelection,
  TypeSelectOption,
} from "./FormField";
import { EntryForm, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = EntryForm;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  patientId: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const typeOptions: TypeSelectOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health Check" },
  {
    value: "OccupationalHealthcare",
    label: "Occupational Healthcare",
  },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        id: "",
        healthCheckRating: 0,
        diagnosisCodes: [],
        employerName: "",
        sickLeaveEnd: "",
        sickLeaveStart: "",
        dischargeCriteria: "",
        dischargeDate: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const malformedError = "Field is malformed";
        const bothRequiredError =
          "Both or neither of these fields must be filled";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!moment(values.date, "YYYY-MM-DD", true).isValid()) {
          errors.date = malformedError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (values.type === "OccupationalHealthcare" && !values.employerName) {
          errors.employerName = requiredError;
        }
        if (
          values.type === "OccupationalHealthcare" &&
          values.sickLeaveStart !== "" &&
          !moment(values.sickLeaveStart, "YYYY-MM-DD", true).isValid()
        ) {
          errors.sickLeaveStart = malformedError;
        }
        if (
          values.type === "OccupationalHealthcare" &&
          values.sickLeaveEnd !== "" &&
          !moment(values.sickLeaveEnd, "YYYY-MM-DD", true).isValid()
        ) {
          errors.sickLeaveEnd = malformedError;
        }
        if (
          (values.type === "OccupationalHealthcare" &&
            values.sickLeaveStart !== "" &&
            values.sickLeaveEnd === "") ||
          (values.sickLeaveStart === "" && values.sickLeaveEnd !== "")
        ) {
          errors.sickLeaveStart = bothRequiredError;
          errors.sickLeaveEnd = bothRequiredError;
        }
        if (
          values.type === "Hospital" &&
          !moment(values.dischargeDate, "YYYY-MM-DD", true).isValid()
        ) {
          errors.dischargeDate = malformedError;
        }
        if (values.type === "Hospital" && !values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField label="Entry Type" name="type" options={typeOptions} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === "HealthCheck" && (
              <SelectField
                label="Health Check Rating"
                name="healthCheckRating"
                options={healthCheckRatingOptions}
              />
            )}
            {values.type === "OccupationalHealthcare" && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveStart"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveEnd"
                  component={TextField}
                />
              </>
            )}
            {values.type === "Hospital" && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge Criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            )}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
