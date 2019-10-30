import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MenuItems } from './menu-items';

@Component({
  selector: 'app-menu',
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

   selectedMenu : any = null;
   selectedSubMenu : any = null;
   constructor(public menuItems: MenuItems)
   {

   }

   ngOnInit(){
      
   }

   menuClick(value)
   {
      if(this.selectedMenu == value)
      {
         this.selectedMenu = null;
      }
      else
      {
         this.selectedMenu = value;
      } 
   }

   subMenuClick(value)
   {
      if(this.selectedSubMenu == value)
      {
         this.selectedSubMenu = null;
      }
      else
      {
         this.selectedSubMenu = value;
      }
   }
}
