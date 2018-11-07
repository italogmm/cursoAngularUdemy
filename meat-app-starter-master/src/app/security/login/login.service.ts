import { Injectable } from "../../../../node_modules/@angular/core";
import { HttpClient } from "../../../../node_modules/@angular/common/http";
import { Observable } from "../../../../node_modules/rxjs/Observable";
import { MEAT_API } from "../../app.api";
import { User } from "./user.model";
import 'rxjs/add/operator/do'
import { Route, Router, NavigationEnd } from "../../../../node_modules/@angular/router";
import 'rxjs/add/operator/filter'

@Injectable()
export class LoginService {

    user: User;
    lastUrl: string;

    constructor(private http: HttpClient, private router: Router) {
        this.router.events.filter(e => e instanceof NavigationEnd).subscribe(
            (e: NavigationEnd) => this.lastUrl = e.url);
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`,
            {email: email, password: password}).do(user => this.user = user);
    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)]);
    }

    logout(){
        this.user = undefined;
    }


}