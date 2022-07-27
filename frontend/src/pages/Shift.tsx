import React, { FunctionComponent, useEffect, useState } from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { getErrorMessage } from "../helper/error/index";
import { deleteShiftById, getShifts, publishShift } from "../helper/api/shift";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { Button, Box } from "@material-ui/core";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "white",
    color: theme.color.turquoise,
  },
  publishButton: {
    color: "green",
    borderColor: "green",
  },
}));

interface ActionButtonProps {
  id: string;
  isPublished: boolean;
  onDelete: () => void;
}
const ActionButton: FunctionComponent<ActionButtonProps> = ({
  id,
  isPublished,
  onDelete,
}) => {
  return (
    <div>
      <IconButton
        size="small"
        aria-label="delete"
        component={RouterLink}
        disabled={isPublished}
        to={`/shift/${id}/edit`}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        aria-label="delete"
        disabled={isPublished}
        onClick={() => onDelete()}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const Shift = () => {
  const classes = useStyles();
  const history = useHistory();

  const [rows, setRows] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const onDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteConfirm(true);
  };

  const onCloseDeleteDialog = () => {
    setSelectedId(null);
    setShowDeleteConfirm(false);
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      setErrMsg("");
      const { results } = await getShifts(currentStartWeek, currentEndWeek);
      setRows(results);
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentWeek = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const last = first + 6;
    const monday = new Date(today.setDate(first));
    const sunday = new Date(today.setDate(last));
    return { monday, sunday };
  };

  //current Week
  const { monday, sunday } = getCurrentWeek();
  const [currentStartWeek, setCurrentStartWeek] = useState(
    moment(monday).format("YYYY-MM-DD")
  );
  const [currentEndWeek, setCurrentEndWeek] = useState(
    moment(sunday).format("YYYY-MM-DD")
  );

  useEffect(() => {
    getData();
  }, [currentStartWeek, currentEndWeek]);

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Start Time",
      selector: "startTime",
      sortable: true,
    },
    {
      name: "End Time",
      selector: "endTime",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <ActionButton
          id={row.id}
          isPublished={row.isPublished}
          onDelete={() => onDeleteClick(row.id)}
        />
      ),
    },
  ];

  const deleteDataById = async () => {
    try {
      setDeleteLoading(true);
      setErrMsg("");

      if (selectedId === null) {
        throw new Error("ID is null");
      }
      await deleteShiftById(selectedId);
      const tempRows = [...rows];
      const idx = tempRows.findIndex((v: any) => v.id === selectedId);
      tempRows.splice(idx, 1);
      setRows(tempRows);
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setDeleteLoading(false);
      onCloseDeleteDialog();
    }
  };

  const changeWeekHandler = (type: string) => {
    let monday = new Date(currentStartWeek);
    let sunday = new Date(currentEndWeek);
    if (type === "previous") {
      monday.setDate(monday.getDate() - 7);
      sunday.setDate(sunday.getDate() - 7);
    } else {
      monday.setDate(monday.getDate() + 7);
      sunday.setDate(sunday.getDate() + 7);
    }
    let newMonday = moment(monday).format("YYYY-MM-DD");
    let newSunday = moment(sunday).format("YYYY-MM-DD");

    setCurrentStartWeek(newMonday);
    setCurrentEndWeek(newSunday);
  };

  const publishHandler = async () => {
    try {
      setDeleteLoading(true);
      setErrMsg("");
      await publishShift(currentStartWeek, currentEndWeek);
      const newRows = rows.map((v: any) => {
        v.isPublished = true;
        return v;
      });
      setRows(newRows);
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setDeleteLoading(false);
      onCloseDeleteDialog();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardContent>
            {errMsg.length > 0 ? (
              <Alert severity="error">{errMsg}</Alert>
            ) : (
              <></>
            )}
            <Grid>
              <Box display="flex">
                <Button onClick={() => changeWeekHandler("previous")}>
                  <ArrowBackIosIcon />
                </Button>
                <p>
                  {moment(currentStartWeek).format("MMM DD")}-
                  {moment(currentEndWeek).format("MMM DD")}
                </p>
                <Button onClick={() => changeWeekHandler("next")}>
                  <ArrowForwardIosIcon />
                </Button>
                <Box sx={{ ml: "auto", my: "auto" }}>
                  <Button
                    variant="outlined"
                    disabled={rows.length === 0 || rows[0].isPublished}
                    className={classes.publishButton}
                    onClick={() => publishHandler()}
                  >
                    Publish
                  </Button>
                </Box>
              </Box>
            </Grid>
            <DataTable
              columns={columns}
              data={rows}
              pagination
              progressPending={isLoading}
            />
          </CardContent>
        </Card>
      </Grid>
      <Fab
        size="medium"
        aria-label="add"
        className={classes.fab}
        onClick={() => history.push("/shift/add")}
      >
        <AddIcon />
      </Fab>
      <ConfirmDialog
        title="Delete Confirmation"
        description={`Do you want to delete this data ?`}
        onClose={onCloseDeleteDialog}
        open={showDeleteConfirm}
        onYes={deleteDataById}
        loading={deleteLoading}
      />
    </Grid>
  );
};

export default Shift;
