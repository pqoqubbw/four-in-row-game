import {
  callbackFunc,
  IEvents,
  IFieldProps,
  IFieldViewProps,
  IPlayersInfo,
} from 'game-core/dist/@types/types';

export interface IEvent {
  events: IEvents;
  subscribe(eventName: string, fn: callbackFunc): void;
  trigger(eventName: string, data: any): void;
  unsubscribe(eventName: string, func: callbackFunc): void;
}

export interface INextPlayerView {
  currentPlayerIndex: number;
  players: Array<string>;
}

export interface IPlayerView {
  game: {
    currentPlayerIndex: number;
    field: IFieldProps;
    gameInfo: any;
    isFinished: boolean;
    on: IEvent;
    players: Array<IPlayersInfo>;
    turn: number;
    clearBoard: (symbol: number) => void;
    makeMove: ({ x, y }: any) => void;
    children?: React.ReactNode;
  };
}

export interface IResetButton {
  clearBoard: (symbol: number) => void;
  clearField: () => void;
}

export interface IDrawBoardProps {
  board: (string | null)[][];
  isError: boolean;
  handleClick: ({ x, y }: IFieldViewProps) => void;
}
