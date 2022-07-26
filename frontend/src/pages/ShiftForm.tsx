import React, { ChangeEvent, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button, CardActions } from "@material-ui/core";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { format, set } from "date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { getErrorMessage } from "../helper/error";
import {
  createShifts,
  getShiftById,
  updateShiftById,
} from "../helper/api/shift";
import { AccessTime } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40,
  },
  right: {
    marginLeft: "auto",
  },
  backBtn: {
    backgroundColor: theme.color.red,
    color: "white",
  },
  saveBtn: {
    backgroundColor: theme.color.turqouise,
    color: "white",
    marginLeft: "auto",
  },
}));

interface PathParams {
  id?: string;
}

interface FormData {
  name: string | null;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
}

const formSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.date().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().greater(Joi.ref("startTime")).required(),
});

const defaultValues = {
  name: "",
  date: new Date(),
  startTime: set(new Date(), { hours: 0, minutes: 0, seconds: 0 }),
  endTime: new Date(),
};

const ShiftForm = () => {
  const history = useHistory();
  const { id } = useParams<PathParams>();

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>("");
  const [currentData, setCurrentData] = useState<any | null>(null);

  const { register, handleSubmit, errors, setValue, watch } = useForm<FormData>(
    {
      resolver: joiResolver(formSchema),
      defaultValues,
    }
  );

  useEffect(() => {
    const getDetail = async () => {
      try {
        setIsLoading(true);
        setErrMsg("");
        const { results } = await getShiftById(id!);
        setCurrentData(results);
      } catch (error) {
        const message = getErrorMessage(error);
        setErrMsg(message);
      } finally {
        setIsLoading(false);
      }
    };

    register({ name: "name", type: "text" });
    register({ name: "date", type: "text" });
    register({ name: "startTime", type: "text" });
    register({ name: "endTime", type: "text" });

    if (id) {
      getDetail();
    }
  }, [id, register]);

  useEffect(() => {
    if (currentData !== null) {
      const startTime =
        format(new Date(), "yyyy-MM-dd") + " " + currentData.startTime;
      const endTime =
        format(new Date(), "yyyy-MM-dd") + " " + currentData.endTime;

      setValue("name", currentData.name);
      setValue("date", currentData.date);
      setValue("startTime", startTime);
      setValue("endTime", endTime);
    }
  }, [currentData, setValue]);

  const handleNameChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue("name", e.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setValue("date", date);
  };
  const handleStartTimeChange = (v: Date | null) => {
    setValue("startTime", v);
  };
  const handleEndTimeChange = (v: Date | null) => {
    setValue("endTime", v);
  };

  const onSubmit = handleSubmit(async ({ name, date, startTime, endTime }) => {
    try {
      setSubmitLoading(true);
      setErrMsg("");
      const formattedDate = format(date!, "yyyy-MM-dd");
      const formattedStartTime = format(startTime!, "HH:mm");
      const formattedEndTime = format(endTime!, "HH:mm");

      const payload = {
        name,
        date: formattedDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      };

      if (id) {
        await updateShiftById(id, payload);
      } else {
        await createShifts(payload);
      }
      history.push("/shift");
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setSubmitLoading(false);
    }
  });

  const watchName = watch("name", "");
  const watchDate = watch("date", defaultValues.date);
  const watchStartTime = watch("startTime", defaultValues.startTime);
  const watchEndTime = watch("endTime", defaultValues.endTime);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardContent>
            <Button
              className={classes.backBtn}
              variant="contained"
              component={RouterLink}
              to="/shift"
              disabled={submitLoading}
            >
              Back
            </Button>
          </CardContent>
          <CardContent>
            {errMsg!.length > 0 ? (
              <Alert severity="error">{errMsg}</Alert>
            ) : (
              <></>
            )}
            <form id="myForm" noValidate onSubmit={onSubmit}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Shift Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      value={watchName}
                      onChange={handleNameChange}
                      error={errors.name !== undefined}
                      helperText={errors.name?.message}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        id="date"
                        name="date"
                        label="Event date"
                        format="dd.MM.yyyy"
                        disablePast
                        margin="normal"
                        disableToolbar
                        fullWidth
                        value={watchDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        error={errors.hasOwnProperty("date")}
                        helperText={errors.date && errors.date.message}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        ampm={false}
                        margin="normal"
                        id="startTime"
                        label="Start Time"
                        name="startTime"
                        value={watchStartTime}
                        onChange={handleStartTimeChange}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                        error={errors.hasOwnProperty("startTime")}
                        helperText={
                          errors.startTime && errors.startTime.message
                        }
                        keyboardIcon={<AccessTime />}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        ampm={false}
                        margin="normal"
                        id="endTime"
                        label="End Time"
                        name="endTime"
                        value={watchEndTime}
                        onChange={handleEndTimeChange}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                        error={errors.hasOwnProperty("endTime")}
                        helperText={errors.endTime && errors.endTime.message}
                        keyboardIcon={<AccessTime />}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              )}
            </form>
          </CardContent>
          <CardActions>
            {submitLoading ? (
              <CircularProgress className={classes.right} />
            ) : (
              <Button
                type="submit"
                form="myForm"
                variant="contained"
                color="primary"
                className={classes.saveBtn}
              >
                Save
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ShiftForm;
