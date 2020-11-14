import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Step,
  Box,
  StepLabel,
  Stepper,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";

const timer = (time: number) => new Promise((acc) => setTimeout(acc, time));

let validationSchema = yup.object().shape({
  firstName: yup.string().required("This field is required."),
  lastName: yup.string().required("This field is required."),
  email: yup.string().email().required("This field is required."),
  age: yup.number().moreThan(15, "You need to be older than 15 Years"),
});
const Home = () => {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            age: 16,
            money: 0,

            notes: "",
          }}
          onSubmit={async (values) => {
            await timer(3000);
            console.log("values", values);
            alert("Congrats! Your Form Has Been Submitted");
          }}
        >
          <FormikStep label="Personal Data" validationSchema={validationSchema}>
            <Grid container direction="column" justify="center">
              <Grid item>
                <Box paddingBottom={2}>
                  <Field
                    fullWidth
                    variant="outlined"
                    name="firstName"
                    component={TextField}
                    label="First Name"
                    required
                  ></Field>
                </Box>
              </Grid>
              <Grid item>
                <Box paddingBottom={2}>
                  <Field
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    component={TextField}
                    label="Last Name"
                    required
                  ></Field>
                </Box>
              </Grid>
              <Grid item>
                <Box paddingBottom={2}>
                  <Field
                    required
                    fullWidth
                    variant="outlined"
                    name="email"
                    component={TextField}
                    label="Email"
                  ></Field>
                </Box>
              </Grid>
              <Grid item>
                <Box paddingBottom={2}>
                  <Field
                    required
                    fullWidth
                    variant="outlined"
                    type="number"
                    name="age"
                    component={TextField}
                    label="age"
                  ></Field>
                </Box>
              </Grid>
            </Grid>
          </FormikStep>

          <FormikStep
            label="Financial Data"
            validationSchema={yup.object({
              money: yup
                .number()
                .moreThan(25000, "Your Salary should be more than 25k"),
            })}
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Box paddingBottom={2}>
                  <Field
                    required
                    fullWidth
                    name="money"
                    component={TextField}
                    label="Salary"
                  ></Field>
                </Box>
              </Grid>
            </Grid>
          </FormikStep>

          <FormikStep label="More Info">
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="notes"
                component={TextField}
                label="Add Notes"
              ></Field>
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <div>{children}</div>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step] as React.ReactElement<
    FormikStepProps
  >;
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}

          <Grid container justify="center" spacing={1}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="secondary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back{" "}
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="secondary"
                type="submit"
              >
                {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default Home;
