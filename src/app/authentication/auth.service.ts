import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs/Rx';

declare var firebase: any;

@Injectable()
export class AuthService {
    constructor(private router: Router) { }

    signupUser(user: User) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .catch(function (error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // todo
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    signinUser(user: User) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .catch(function (error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // todo
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    logout() {
        this.router.navigate(['/login']);
        firebase.auth().signOut();
    }

    isAuthenticated(): Observable<boolean> {

        const subject = new Subject<boolean>();

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                subject.next(true);
            } else {
                subject.next(false);
            }
        });

        return subject.asObservable();
    }
}
