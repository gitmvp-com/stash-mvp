import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card, Badge, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MediaItem, getMediaItem, deleteMediaItem } from '../services/storage';
import { EditMediaModal } from '../components/EditMediaModal';

export const MediaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const loadMedia = async () => {
    const item = await getMediaItem(id);
    if (item) {
      setMedia(item);
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    loadMedia();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this media item?')) {
      await deleteMediaItem(id);
      history.push('/');
    }
  };

  if (!media) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-4">
      <Button variant="link" onClick={() => history.push('/')}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Library
      </Button>

      <Card className="mt-3">
        <Card.Body>
          <Row>
            <Col md={6}>
              <div className="media-thumbnail mb-3">
                {media.thumbnailUrl ? (
                  <img src={media.thumbnailUrl} alt={media.title} style={{ width: '100%', height: 'auto' }} />
                ) : (
                  <div style={{ fontSize: '48px', color: '#666' }}>📁</div>
                )}
              </div>
            </Col>
            <Col md={6}>
              <h2>{media.title}</h2>
              {media.description && (
                <p className="text-muted">{media.description}</p>
              )}
              
              <div className="mb-3">
                <strong>Tags:</strong>
                <div className="mt-2">
                  {media.tags.length > 0 ? (
                    media.tags.map((tag) => (
                      <Badge key={tag} variant="primary" className="tag-badge">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted">No tags</span>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <strong>Added:</strong> {new Date(media.createdAt).toLocaleDateString()}
              </div>

              <div className="mt-4">
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={() => setShowEditModal(true)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <EditMediaModal
        show={showEditModal}
        media={media}
        onHide={() => setShowEditModal(false)}
        onUpdated={loadMedia}
      />
    </div>
  );
};