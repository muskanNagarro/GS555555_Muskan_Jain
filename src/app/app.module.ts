import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { SkuComponent } from './sku/sku.component';
import { PlanningComponent } from './planning/planning.component';
import { LoginComponent } from './login/login.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { LeftNavigationComponent } from './left-navigation/left-navigation.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms'; 
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: "legacy"});
@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    SkuComponent,
    PlanningComponent,
    LoginComponent,
    TopNavigationComponent,
    LeftNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    FormsModule,
    // Register all Community features
    
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }

