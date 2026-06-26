export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  type?: string;
  icon?: string;
  image?: string;
};

export type PositionedTimelineEvent = TimelineEvent & {
  bottom: number;
};

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

export function yearsBetween(startDate: string, endDate: string) {
  return Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / MS_PER_YEAR;
}

export function getSortedEvents(events: TimelineEvent[]) {
  return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function positionEvents({
  events,
  startDate,
  scaleByDate,
  pixelsPerYear,
  itemGap,
}: {
  events: TimelineEvent[];
  startDate: string;
  scaleByDate: boolean;
  pixelsPerYear: number;
  itemGap: number;
}): PositionedTimelineEvent[] {
  const sortedEvents = getSortedEvents(events);

  return sortedEvents.map((event, index) => ({
    ...event,
    bottom: scaleByDate ? yearsBetween(startDate, event.date) * pixelsPerYear : index * itemGap,
  }));
}

export function getTimelineHeight(events: PositionedTimelineEvent[], itemGap: number) {
  const maxBottom = Math.max(...events.map((event) => event.bottom), 0);
  return maxBottom + itemGap * 2;
}

export function getYearMarkers(startDate: string, endDate: string, pixelsPerYear: number) {
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();

  return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = startYear + index;
    return {
      year,
      bottom: yearsBetween(startDate, `${year}-01-01`) * pixelsPerYear,
    };
  });
}
