import { callbackFunc, IEvents, IFieldProps, IPlayersInfo } from "game-core/dist/@types/types";

export interface IEvent {
    events: IEvents;
    subscribe(eventName: string, fn: callbackFunc): void;
    trigger(eventName: string, data: any): void;
}

export interface INextPlayerView {
    currentPlayerIndex: number,
    players: Array<string>
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