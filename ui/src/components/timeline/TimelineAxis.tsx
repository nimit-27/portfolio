import React from 'react';

type TimelineAxisProps = {
  markers: { year: number; bottom: number }[];
};

export function TimelineAxis({ markers }: TimelineAxisProps) {
  return (
    <div className="timeline-axis" aria-hidden="true">
      {markers.map((marker) => (
        <span key={marker.year} className="timeline-axis__marker" style={{ bottom: marker.bottom }}>
          {marker.year}
        </span>
      ))}
    </div>
  );
}
