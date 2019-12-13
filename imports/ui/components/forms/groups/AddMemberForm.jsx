import React from "react";
import gql from "graphql-tag";
import { Formik } from "formik";
import { Query } from "react-apollo";
import * as Yup from "yup";

import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from "@material-ui/core";

import Spinner from "../../utils/Spinner";

const validationSchema = Yup.object().shape({
  target: Yup.string().required("Required field")
});

function Form({ onCancel, userid, customGroups }) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  return (
    <Formik
      initialValues={{ target: "" }}
      onSubmit={values => console.log(values)}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleSubmit, isSubmitting, errors }) => {
        const { target } = values;
        return (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <FormControl
                variant="outlined"
                fullWidth
                required
                id="taget"
                margin="dense"
              >
                <InputLabel ref={inputLabel} htmlFor="target">
                  Group
                </InputLabel>
                <Select
                  value={target}
                  autoWidth
                  onChange={handleChange}
                  input={<OutlinedInput labelWidth={labelWidth} id="target" />}
                  inputProps={{
                    name: "target",
                    id: "target"
                  }}
                >
                  <MenuItem disabled>
                    <em>Select Group</em>
                  </MenuItem>
                  {customGroups.length > 0 &&
                    customGroups.map(({ _id, title }) => (
                      <MenuItem key={_id} value={_id}>
                        <em>{title}</em>
                      </MenuItem>
                    ))}
                </Select>
                {errors.target && (
                  <FormHelperText>{errors.target}</FormHelperText>
                )}
              </FormControl>
              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Button
                    color="default"
                    variant="contained"
                    onClick={() => onCancel()}
                    style={{ marginRight: 8 }}
                  >
                    {Meteor.settings.public.forms.commons.CANCEL_BTN_LBL}
                  </Button>
                  <Button color="secondary" variant="contained" type="submit">
                    {Meteor.settings.public.forms.commons.SUBMIT_BTN_LBL}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}

const CURRENT_USER = gql`
  query {
    customGroups {
      _id
      title
    }
  }
`;

export default props => {
  return (
    <Query query={CURRENT_USER} fetchPolicy="network-only">
      {({ error, loading, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error: ${error}`;
        return <Form {...props} {...data} />;
      }}
    </Query>
  );
};
