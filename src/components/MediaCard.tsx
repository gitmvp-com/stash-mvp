import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { MediaItem } from '../services/storage';

interface MediaCardProps {
  media: MediaItem;
  onClick: () => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ media, onClick }) => {
  return (
    <Card className="media-card" onClick={onClick}>
      <div className="media-thumbnail">
        {media.thumbnailUrl ? (
          <img src={media.thumbnailUrl} alt={media.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ fontSize: '48px', color: '#666' }}>📁</div>
        )}
      </div>
      <Card.Body>
        <Card.Title>{media.title}</Card.Title>
        {media.description && (
          <Card.Text className="text-muted" style={{ fontSize: '0.9em' }}>
            {media.description.substring(0, 100)}{media.description.length > 100 ? '...' : ''}
          </Card.Text>
        )}
        <div>
          {media.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="primary" className="tag-badge">
              {tag}
            </Badge>
          ))}
          {media.tags.length > 3 && (
            <Badge variant="secondary" className="tag-badge">
              +{media.tags.length - 3}
            </Badge>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};