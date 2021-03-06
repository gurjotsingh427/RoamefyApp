import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Attractions } from '../../models/attractions/attractions.model';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { PlacesViewPage } from '../places-view/places-view';

@IonicPage()
@Component({
  selector: 'page-edit-attraction',
  templateUrl: 'edit-attraction.html',
})
export class EditAttractionPage {

  attraction: Attractions = {
    name: null,
    description: null,
    address: null, 
    addressID: null,
    latitude: null,
    longitude: null,
    website: null,
    phone: null,
    hours: null
  }

  userID: string;
  attKey: string;
  attDocument: AngularFirestoreDocument<Attractions>;
  attDoc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private firebase: FirebaseProvider, private modalCtrl: ModalController,
    private afs: AngularFirestore) {

    // get user id
    this.userID = this.firebase.getUserId();

    // get id sent from previous page
    this.attKey = this.navParams.get('id');

    // get other fields of the object with id = 'id'
    this.attDocument = this.afs.collection("attractions").doc<Attractions>(this.attKey);
    this.attDoc = this.attDocument.valueChanges().forEach( e => {
        this.attraction.address = e.address;
        this.attraction.addressID = e.addressID;
        this.attraction.description = e.description;
        this.attraction.latitude = e.latitude;
        this.attraction.longitude = e.longitude;
        this.attraction.name = e.name;
        this.attraction.phone = e.phone;
        this.attraction.hours = e.hours;
        this.attraction.website = e.website;
    })
  }

  // on page load
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAttractionPage');
  }

  // update attraction
  editAttraction(attraction) {
      this.firebase.updateAttraction(attraction, this.attKey);
      this.navCtrl.setRoot(PlacesViewPage);
  }
  
  // get address string from autocomplete api
  showAddressModal (){
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      this.attraction.address = data === undefined ? null : data.description;
      this.attraction.addressID = data === undefined ? null : data.placeID;
      this.attraction.latitude = data === undefined ? null : data.lat;
      this.attraction.longitude = data === undefined ? null : data.lng;
    });
    modal.present();
  }
  
  // redirect to places page
  cancel(){
    this.navCtrl.setRoot(PlacesViewPage);
  }

  // delete attraction from database
  delete(){
    this.firebase.deleteAttraction(this.attKey);
  }
}
