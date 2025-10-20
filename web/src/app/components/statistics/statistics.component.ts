import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { GameStatistics } from 'src/app/interfaces/game-statistics';
import { GameServiceService } from 'src/app/services/game-service.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css'],
    standalone: false
})
export class StatisticsComponent {

  gameStats: GameStatistics[] | undefined;
  isLoading: boolean = true;

  totalPlayers: number[] = [];
  totalSuccesfulGuesses: number[] = [];
  xAxisData: string[] = [];

  chartOption: EChartsOption | null = null;

  constructor(@Inject(LOCALE_ID) private locale: string, public gameService: GameServiceService) {}

  async ngOnInit() {

    this.gameStats = await this.gameService.steamdleService.getGameStatistics();

    for(let i = this.gameStats.length - 1; i >= 0; i--){
      
      this.totalPlayers.push(this.gameStats[i].PlayerCount);
      this.totalSuccesfulGuesses.push(this.gameStats[i].Guessed);
      this.xAxisData.push(new DatePipe(this.locale).transform(this.gameStats[i].Day)!);

    }

    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Total players', 'Number of succesful guesses'],
        backgroundColor: 'rgb(148 163 184)',
        borderRadius: 5

      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Total players',
          type: 'line',
          areaStyle: {},
          data: this.totalPlayers
        },
        {
          name: 'Number of succesful guesses',
          type: 'line',
          areaStyle: {},
          data: this.totalSuccesfulGuesses
        }
      ]
    };

    console.log(this.totalPlayers);
    console.log(this.totalSuccesfulGuesses);

    this.isLoading = false;

  }

}
