import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Home from "./pages/Home";
import Shift from "./pages/Shift";
import ShiftForm from "./pages/ShiftForm";
import { ThemeProvider } from "@material-ui/core";
import { staffanyTheme } from "./commons/theme";

function App() {
  return (
    <ThemeProvider theme={staffanyTheme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Dashboard>
              <Home />
            </Dashboard>
          </Route>
          <Route exact path="/shift">
            <Dashboard>
              <Shift />
            </Dashboard>
          </Route>
          <Route exact path="/shift/add">
            <Dashboard>
              <ShiftForm />
            </Dashboard>
          </Route>
          <Route exact path="/shift/:id/edit">
            <Dashboard>
              <ShiftForm />
            </Dashboard>
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
