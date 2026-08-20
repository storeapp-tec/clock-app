export type ClockDesignId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface ClockDesignDefinition {
  id: ClockDesignId;
  name: string;
  category: string;
  description: string;
  defaultColors: Record<string, string>;
  fontOptions?: { id: string; label: string; fontFamily: string }[];
  defaultFont?: string;
  colorFields: { key: string; label: string; defaultColor: string }[];
}

export interface ClockConfigState {
  currentDesign: ClockDesignId;
  is12h: boolean;
  showDate: boolean;
  showSeconds: boolean;
  designSeconds?: Record<number, boolean>;
  brightness: number; // 0.2 to 1.0
  keepAwake: boolean;
  designColors: Record<number, Record<string, string>>;
  designFonts: Record<number, string>;
}
