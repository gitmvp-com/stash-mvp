import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { MediaCard } from '../components/MediaCard';
import { AddMediaModal } from '../components/AddMediaModal';
import { MediaItem, getMediaItems } from '../services/storage';

export const MediaLibrary: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const history = useHistory();

  const loadMedia = async () => {
    const items = await getMediaItems();
    setMediaItems(items);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleMediaClick = (id: string) => {
    history.push(`/media/${id}`);
  };

  return (
    <div className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Media Library</h2>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add Media
          </Button>
        </Col>
      </Row>

      {mediaItems.length === 0 ? (
        <div className="text-center py-5">
          <h4>No media items yet</h4>
          <p>Click "Add Media" to start organizing your collection</p>
        </div>
      ) : (
        <div className="media-grid">
          {mediaItems.map((item) => (
            <MediaCard
              key={item.id}
              media={item}
              onClick={() => handleMediaClick(item.id)}
            />
          ))}
        </div>
      )}

      <AddMediaModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdded={loadMedia}
      />
    </div>
  );
};