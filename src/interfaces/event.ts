type TEventType = "workshop" | "activity" | "tech_talk";
type TPermission = "public" | "private";

type TSpeaker = {
  name: string;
};

export type TEvent = {
  id: number;
  name: string;
  event_type: TEventType;
  permission?: TPermission;
  start_time: number;
  end_time: number;
  description?: string;
  speakers: TSpeaker[];
  public_url?: string;
  private_url: string;
  related_events: number[];
};
