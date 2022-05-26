export type Gain = {
  readonly stat: Stat;
  readonly ts: number;
  readonly uuid: string;
  readonly delta: number;
};

export type Stat = string;
