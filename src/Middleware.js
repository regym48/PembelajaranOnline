import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
// import App from './App';
import { Login } from "./Component/Login";
import { ListVideoAdmin } from "./Component/ListVideoAdmin";
import { ListUsers } from "./Component/ListUsers";
import { LoginUser } from "./Component/AuthUsers/Login";
import { RegistrasiUser } from "./Component/AuthUsers/Registrasi";
import { PageListVideoUser } from "./Component/PageListVideoUser/Index";
import { SoalQuiz } from "./Component/SoalQuiz/Index";
import { Skor } from "./Component/Skor/Skor";

const Middleware = () =>{
    return(
        <Router>
            <Switch>
                <Route exact path="/" render={() => <LoginUser/>} />
                <Route exact path="/login-admin" render={() => <Login/>} />
                <Route exact path="/list-video-admin" render={() => <ListVideoAdmin/>} />
                <Route exact path="/list-users" render={() => <ListUsers/>} />
                <Route exact path="/registrasi-user" render={() => <RegistrasiUser/>} />
                <Route exact path="/list-video-user" render={() => <PageListVideoUser/>} />
                <Route exact path="/kuis" render={() => <SoalQuiz/>} />
                <Route exact path="/skor" render={() => <Skor/>} />
            </Switch>
        </Router>
    )
}
export default Middleware;