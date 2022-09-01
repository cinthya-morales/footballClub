export interface IMatchGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IHomeMatch {
  id: number;
  teamName: string;
  teamHome: IMatchGoals[];
}
