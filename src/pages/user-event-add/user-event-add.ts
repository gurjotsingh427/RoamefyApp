import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { UserEvent } from '../../models/events/userevent.model';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { UserCreatedEventPage } from '../user-created-event/user-created-event';

interface Interest {
  name: string;
}

//@IonicPage()
@Component({
  selector: 'page-user-event-add',
  templateUrl: 'user-event-add.html',
})

export class UserEventAddPage {
  event: UserEvent = {
    name: null,
    description: null,
    price: 0,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    address: null, 
    addressID: null,
    latitude: null,
    longitude: null,
    website: null,
    phone: null,
    host: null,
    categories: []
  };

  interestCollection: AngularFirestoreCollection<Interest>;
  interest: any;
  userID: string;
  categories: any[];

constructor(public navCtrl: NavController, public navParams: NavParams, 
  public alertCtrl: AlertController, private firebase: FirebaseProvider, 
  private afs: AngularFirestore, private modalCtrl: ModalController) {

  this.interestCollection = this.afs.collection<Interest>('interest', ref => {
    return ref.orderBy('name')
  });

  this.interest = this.interestCollection.snapshotChanges().map(actions => {
    return actions.map(snap => {
      let id = snap.payload.doc.id;
      let data = { id, ...snap.payload.doc.data() };
      return data;
    });
  });

  this.userID = this.firebase.getUserId();
 }

ionViewDidLoad() {
  console.log('ionViewDidLoad AddEventPage');
}

addEvent(event, categories) {
  if(this.categories.length > 5){
    //this.navCtrl.setRoot(AddEventPage);
    let alert = this.alertCtrl.create({
    message: "Sorry, you can't select more than 5 categories",
    buttons: [
      {
        text: "Ok",
        role: 'cancel'
      }
    ]
    });
    alert.present();
  } else {
    event.categories = categories;
    event.host = this.userID;
    this.firebase.addEvent(event);
    this.navCtrl.setRoot(UserCreatedEventPage);
  }
}

showAddressModal (){
  let modal = this.modalCtrl.create(AutocompletePage);
  modal.onDidDismiss(data => {
    this.event.address = data.description? data.description : "";
    this.event.addressID = data.place_id? data.place_id : "";
  });
  modal.present();
}

cancel(){
  this.navCtrl.setRoot(UserCreatedEventPage);
}

ngOnDestroy() {
  console.log("exiting AddEventPage")
}
}
