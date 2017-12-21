import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// page reference
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EventListPage } from '../pages/event-list/event-list';
import { EventMapPage } from '../pages/event-map/event-map';
import { InterestPage } from '../pages/interest/interest';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { TimeDistancePage } from '../pages/time-distance/time-distance';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { UserCreatedEventPage } from '../pages/user-created-event/user-created-event';
import { UserEventAddPage } from '../pages/user-event-add/user-event-add';
import { UserEventEditPage } from '../pages/user-event-edit/user-event-edit'
import { UserProfileEditPage } from '../pages/user-profile-edit/user-profile-edit';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { EventChatsPage } from '../pages/event-chats/event-chats';
import { EvenUserChatsPage } from '../pages/even-user-chats/even-user-chats';

import { HttpClientModule } from '@angular/common/http';
import { HttpProvider } from '../providers/http/http';
import { AngularFireModule } from 'angularfire2/angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { UserBookmarkedEventsPage } from '../pages/user-bookmarked-events/user-bookmarked-events';

//Firebase database configuration data
//DO NOT CHANGE ANYTHING
const firebaseConfig = {
  apiKey: "AIzaSyAfAtP5YK9MsFgB7erifiiLX3XT4JouuY0",
  authDomain: "roamefy-app.firebaseapp.com",
  databaseURL: "https://roamefy-app.firebaseio.com",
  projectId: "roamefy-app",
  storageBucket: "roamefy-app.appspot.com",
  messagingSenderId: "844616883402"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    EventListPage,
    EventMapPage,
    InterestPage,
    LoginPage,
    SettingsPage,
    TimeDistancePage,
    UserProfilePage,
    UserProfileEditPage,
    UserCreatedEventPage,
    UserEventAddPage,
    UserEventEditPage,
    AutocompletePage,
    ResetPasswordPage,
    EventChatsPage,
    EvenUserChatsPage,
    UserBookmarkedEventsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    EventListPage,
    EventMapPage,
    InterestPage,
    LoginPage,
    SettingsPage,
    TimeDistancePage,
    UserProfilePage,
    UserProfileEditPage,
    UserCreatedEventPage,
    UserEventAddPage,
    UserEventEditPage,
    AutocompletePage,
    ResetPasswordPage,
    EventChatsPage,
    EvenUserChatsPage,
    UserBookmarkedEventsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    HttpProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
