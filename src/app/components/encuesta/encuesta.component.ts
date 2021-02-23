import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

 
  public barChartLabels: string[] = ['Pregunta1', 'Pregunta2', 'pregunta3', 'Pregunta4'];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Entrevistados' }
  ];

  constructor( private http:HttpClient, public wsService: WebsocketService) { }

  ngOnInit() {
    this.http.get('http://localhost:5000/grafica')
    .subscribe(( data:any ) => {
      this.barChartData = data;
    });
    this.escucharSocket();
  }

  escucharSocket(){
    this.wsService.listen('cambio-grafica').subscribe((data:any) => this.barChartData= data);
  }

}
