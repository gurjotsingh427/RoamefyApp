import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { InterestPage } from '../interest/interest';
import { TimeDistancePage } from '../time-distance/time-distance';
import { UserCreatedEventPage } from '../user-created-event/user-created-event'
import { AngularFirestore } from 'angularfire2/firestore';
import { EventChatsPage } from '../event-chats/event-chats';
import { UserBookmarkedEventsPage } from '../user-bookmarked-events/user-bookmarked-events';
import { UserProfilePage } from '../user-profile/user-profile';
import { AddAttractionPage } from '../add-attraction/add-attraction';
import { HomePage } from '../home/home';

interface User {
  role: string;
}

interface Access{
  name: string;
}

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {
  pages: Array<{title: string, component: any}>;
  userEventPage: {title: string, component: any};
  addAttractionPage: {title: string, component: any};
  role: string = 'normal';
  access: string = null;
  userID: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public firebase: FirebaseProvider, private afs: AngularFirestore) {
    this.pages = [
      { title: "Interests", component: InterestPage },
      { title: "Time and Distance", component: TimeDistancePage },
      { title: "Bookmarked Events", component: UserBookmarkedEventsPage },
      { title: "Chatrooms", component: EventChatsPage },
      { title: "User Profile", component: UserProfilePage}
    ];
    this.userEventPage = { title: "Events by you", component: UserCreatedEventPage };
    this.addAttractionPage = { title: "Add attractions", component: AddAttractionPage };
    
    this.userID = this.firebase.getUserId();
    this.afs.collection('users').doc<User>(this.userID).valueChanges()
    .subscribe(a => {
      this.role = a.role == null ? 'normal' : a.role;
    })

    this.afs.collection('superiorLevelAccess').doc<Access>(this.userID).snapshotChanges()
    .forEach(a => {
      if (a.payload.exists){
        this.access = this.userID;
      }
    })
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }

  checkUserRole(){
    if( this.role == "pro")
      return true;
    return false;
  }

  checkIfDev(){
    if( this.access == this.userID)
      return true;
    return false;
  }

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }

  ngOnDestroy() {
  }
}
