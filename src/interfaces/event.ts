export interface Event {
    id: number;
    name: string;
    event_type: string;
    permission?: string;
    start_time: number;
    end_time: number;
    description?: string;
    speakers: { name: string }[];
    public_url?: string;
    private_url: string;
    related_events: number[];
}