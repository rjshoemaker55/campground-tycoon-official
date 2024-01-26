export interface UserDocument extends Document {
  username: string;
  password: string;
  money: number;
  lastUpdate: Date;
  tiles: Types.Array<TileDocument["_id"]>;
}

export interface LoggedInUser {
  _id: string;
  username: string;
  money: number;
  lastUpdate: Date;
}

export interface GameState {
  user: LoggedInUser | null;
  tiles: TileDocument[];
}

export interface TileDocument extends Document {
  _id: string;
  userId: string;
  position: number;
  contents?: {
    type: string;
    default: null;
    level: {
      type: number;
      default: 1;
    };
  } | null;
}

export interface MapProps {
  gameState: GameState;
  setGameState: SetGameState;
}

export interface MapTileProps {
  tilesDisabled: boolean;
  setTilesDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  gameState: GameState;
  updateTile: function;
  tile: TileDocument;
  contents: any;
}

export interface TopBarProps {
  gameState: GameState;
}

export type SetGameState = React.Dispatch<React.SetStateAction<GameState>>;
