import React, { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TimelineAxis } from './TimelineAxis';
import { TimelineItem } from './TimelineItem';
import { getTimelineHeight, getYearMarkers, positionEvents, TimelineEvent } from './timelineUtils';

type TimelineProps = {
  startDate: string;
  endDate?: string;
  events: TimelineEvent[];
  scaleByDate?: boolean;
  mapToScale?: boolean;
  pixelsPerYear?: number;
  itemGap?: number;
};

export function Timeline({
  startDate,
  endDate,
  events,
  scaleByDate,
  mapToScale,
  pixelsPerYear = 180,
  itemGap = 220,
}: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldScaleByDate = scaleByDate ?? mapToScale ?? true;
  const latestDate = endDate ?? events.reduce((latest, event) => (new Date(event.date) > new Date(latest) ? event.date : latest), startDate);

  const positionedEvents = useMemo(
    () => positionEvents({ events, startDate, scaleByDate: shouldScaleByDate, pixelsPerYear, itemGap }),
    [events, itemGap, pixelsPerYear, shouldScaleByDate, startDate],
  );
  const height = getTimelineHeight(positionedEvents, itemGap);
  const markers = shouldScaleByDate ? getYearMarkers(startDate, latestDate, pixelsPerYear) : [];

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [height]);

  return (
    <section className="timeline-page" aria-labelledby="timeline-title">
      <div className="timeline-page__intro">
        <Link to="/" className="timeline-page__home-link">← Orbit home</Link>
        <h1 id="timeline-title">Timeline</h1>
        <p>Start at the latest point, then scroll upward to move into earlier chapters.</p>
      </div>
      <div className="timeline-scroll" ref={scrollRef}>
        <div className="timeline" style={{ minHeight: height }}>
          <TimelineAxis markers={markers} />
          {positionedEvents.map((event) => (
            <TimelineItem key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
