import { Component, OnInit } from '@angular/core';
import { AppService } from '../app/service/app_service';
import{Value, WeatherData} from '../app/model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  valueMes = '';
  WeatherDataList: WeatherData[] = []
  values: Value[] = [];

  constructor(private appService: AppService) { 
    this.values = [];
    this.WeatherDataList = [];
  }



  ngOnInit(): void {
   
  }

  removevalue(i:number){
    this.values.splice(i,1);
    this.WeatherDataList.splice(i,1);
  }

  addvalue(){
    this.values.push({value: ""});
  }

  getData(i: number){
    try{

      this.appService.get(this.values[i].value).subscribe(res => {
        let data :WeatherData = <WeatherData> res;

        if(this.WeatherDataList[i] == undefined){
          this.WeatherDataList.push(data); 
          this.WeatherDataList[i].weather[0].icon = "http://openweathermap.org/img/wn/"+ this.WeatherDataList[i].weather[0].icon +"@2x.png";
        }
        else{
          this.WeatherDataList[i] = data;
          this.WeatherDataList[i].weather[0].icon = "http://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png";
        }

      });
    }
    catch(error){
      console.log("error");
    }
  }


  chekHaveresult(i:number) : boolean{
    if( this.WeatherDataList!= undefined &&   this.WeatherDataList[i]!= undefined && 
      this.WeatherDataList[i].name!= "" && this.values[i].value!= undefined 
      && this.values[i].value!= "" && this.values[i].value.toLowerCase() == this.WeatherDataList[i].name.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  }


}