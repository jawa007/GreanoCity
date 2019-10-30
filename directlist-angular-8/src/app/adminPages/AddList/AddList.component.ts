import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { DropzoneComponent , DropzoneDirective,
   DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AddListing } from '../model/AddListing.model';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AddListingService } from './Add.listing.service';

declare var $ : any;

@Component({
  selector: 'admin-add-list',
  templateUrl: './AddList.component.html',
  styleUrls: ['./AddList.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddListComponent implements OnInit{
   timingsList = [];
   categories = [];
   amenities = [];
   successSaveMsg: string = 'Data saved successfully.';
   errorMsg: string = 'Something went wrong.';
   successEditMsg: string = 'Data updated successfully.';
   title: string = 'Angular File Upload';
   editing: boolean = false;

  constructor(private addListingService: AddListingService,private fb: FormBuilder){
     this.timingsList = this.getTimeList()
     this.categories = this.getCategories();
     this.amenities=this.getAmenities()
    
   }
   addListForm = this.fb.group({
    businessName: [''],
    category: [''],
    phone:[''],
    websiteUrl:[''],
    facebookUrl:[''],
    twitterUrl:[''],
    email:[''],
    description:[''],
    keywords:[''],
    website:[''],
    amenities: new FormArray([]),
    location: this.fb.group({
      city: [''],
      pincode: [''],
      address: ['']
    }),
    pricing: this.fb.array([this.fb.group({item:'',description:'',price:''})])
 });

 addPrice() {
  const control = <FormArray>this.addListForm.get('pricing');
  control.push(this.initiatForm());//adding new row
}

remove(index: number) {
  const control = <FormArray>this.addListForm.get('pricing');
  control.removeAt(index);  //removing selected row
}

   initiatForm(): FormGroup {
    const numberPatern = '^[0-9.,]+$';
    return this.fb.group({
      item: ['', Validators.required],  
      description: ['', Validators.required],
      price: ['',Validators.required]
    });
  }

   onCheckChange(event) {
    const formArray: FormArray = this.addListForm.get('amenities') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
          i++;
      });
    }
  }
  

   ngOnInit(){
   }

   onSubmit() {
     console.log(this.addListForm.value);
     if(this.editing ==false){
      console.log("Inside Save");
      this.addListingService.addListing(this.addListForm.value).then(createTodo => {        
        this.editing = true;
      });
    } else{
      console.log("Inside Update");
        this.addListingService.updateListing(this.addListForm.value)
        .then(updatedTodo => {
          this.editing = false;
        });
    }
} 
 
  onUploadError(args: any) {
    console.log('onUploadError:', args);
  }

  onUploadSuccess(args: any) {
      console.log('onUploadSuccess:', args);
  }

  ngAfterViewInit()
   {
      $(".add-listing-section").each(function() {

         var switcherSection = $(this);
         var switcherInput = $(this).find('.switch input');

         if(switcherInput.is(':checked')){
            $(switcherSection).addClass('switcher-on');
         }

         switcherInput.change(function(){
            if(this.checked===true){
               $(switcherSection).addClass('switcher-on');
            } else {
               $(switcherSection).removeClass('switcher-on');
            }
         });

      });
  }

  getTimeList() {
    return [
      { id: '1 AM', name: '1 AM' },
      { id: '2 AM', name: '2 AM' },
      { id: '3 AM', name: '3 AM' },
      { id: '4 AM', name: '4 AM' },
      { id: '5 AM', name: '5 AM' },
      { id: '6 AM', name: '6 AM' },
      { id: '7 AM', name: '7 AM' },
      { id: '8 AM', name: '8 AM' },
      { id: '9 AM', name: '9 AM' },
      { id: '10 AM', name: '10 AM' },
      { id: '11 AM', name: '11 AM' },
      { id: '12 AM', name: '12 AM' },
      { id: '1 PM', name: '1 PM' },
      { id: '2 PM', name: '2 PM' },
      { id: '3 PM', name: '3 PM' },
      { id: '4 PM', name: '4 PM' },
      { id: '5 PM', name: '5 PM' },
      { id: '6 PM', name: '6 PM' },
      { id: '7 PM', name: '7 PM' },
      { id: '8 PM', name: '8 PM' },
      { id: '9 PM', name: '9 PM' },
      { id: '10 PM', name: '10 PM' },
      { id: '11 PM', name: '11 PM' },
      { id: '12 PM', name: '12 PM' }
    ];
  }

  getCategories() {
    return [
      { id: 'Shops', name: 'Shops' },
      { id: 'Hotels', name: 'Hotels' },
      { id: 'Restaurants', name: 'Restaurants' },
      { id: 'Fitness', name: 'Fitness' },
      { id: 'Events', name: 'Events' }
    ];
  }

  getAmenities() {
    return[
      { id: 'Elevator in building', name: 'Elevator in building' },
      { id: 'Friendly workspace', name: 'Friendly workspace' },
      { id: 'Instant Book', name: 'Instant Book' },
      { id: 'Wireless Internet', name: 'Wireless Internet' },
      { id: 'Events', name: 'Events' },
      { id: 'Free parking on premises', name: 'Free parking on premises' },
      { id: 'Free parking on street', name: 'Free parking on street' },
      { id: 'Smoking allowed', name: 'Smoking allowed' },
    ];
  }
}
