import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';
import { LoginPage } from '../login/login'

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading;
  public submitAttempt;

  constructor(public nav: NavController, public authData: FirebaseProvider, public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public menu: MenuController) {
    
    // signup page form builder with field validations
    this.signupForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), 
        Validators.maxLength(64), Validators.pattern("^[a-zA-z]+$")])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), 
        Validators.maxLength(64), Validators.pattern("^[a-zA-z]+$")])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(32), 
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), PasswordValidator.isValid])]
    });
  }

  // signup user function
  signupUser(){
    this.submitAttempt = true;

    // check if the signup form was valid
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {

      // create new normal user
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.firstName, 
        this.signupForm.value.lastName)
      .then(() => {
        let alert = this.alertCtrl.create({
          message: "An email has been sent to you to verify your email address",
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();

        // redirect to login page afte successful signup
        this.nav.setRoot(LoginPage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  // redirect to loginpage
  goHome(){
    this.nav.setRoot(LoginPage);
  }
}