import React, { useEffect, useState } from 'react';
import { Badge, Card, Row, Col } from 'react-bootstrap';
import { getAllTags, getMediaItems, MediaItem } from '../services/storage';
import { useHistory } from 'react-router-dom';

export const Tags: React.FC = () => {
  const [tags, setTags] = useState<{ [key: string]: number }>({});
  const history = useHistory();

  useEffect(() => {
    const loadTags = async () => {
      const allTags = await getAllTags();
      setTags(allTags);
    };
    loadTags();
  }, []);

  return (
    <div className="py-4">
      <h2 className="mb-4">Tags</h2>
      
      {Object.keys(tags).length === 0 ? (
        <div className="text-center py-5">
          <h4>No tags yet</h4>
          <p>Add tags to your media items to see them here</p>
        </div>
      ) : (
        <Row>
          {Object.entries(tags).map(([tag, count]) => (
            <Col key={tag} md={3} className="mb-3">
              <Card>
                <Card.Body>
                  <h5>
                    <Badge variant="primary" style={{ fontSize: '16px' }}>
                      {tag}
                    </Badge>
                  </h5>
                  <p className="text-muted mb-0">{count} item{count !== 1 ? 's' : ''}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};