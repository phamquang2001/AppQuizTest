export interface LoginRequestBody {
  email: string;
  password: string;
}
export interface Game {
  game_id: number[];
  option?: string[];
}

export interface DataCreateAssessment {
  name: string;
  job_function: string;
  game: Game[];
  job_position: string;
  start_date: string;
  end_date: string;
}

export interface loginCandidate {
  token: string;
  email: string;
}
export interface answerType {
  id: number;
  answer?: string;
  game_id: number;
  is_skip: number;
}
