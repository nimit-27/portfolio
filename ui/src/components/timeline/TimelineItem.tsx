import React from 'react';
import { PositionedTimelineEvent } from './timelineUtils';

type TimelineItemProps = {
  event: PositionedTimelineEvent;
};

export function TimelineItem({ event }: TimelineItemProps) {
  return (
    <article className={`timeline-item timeline-item--${event.type ?? 'default'}`} style={{ bottom: event.bottom }}>
      <div className="timeline-item__pin">{event.icon ?? '•'}</div>
      <div className="timeline-item__card">
        <time dateTime={event.date}>{new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</time>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        {event.image && <img src={event.image} alt="" className="timeline-item__image" />}
      </div>
    </article>
  );
}
