import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { getMediaItems } from '../services/storage';

export const Stats: React.FC = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalTags: 0,
    avgTagsPerItem: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const items = await getMediaItems();
      const allTags = new Set<string>();
      let totalTags = 0;

      items.forEach((item) => {
        item.tags.forEach((tag) => allTags.add(tag));
        totalTags += item.tags.length;
      });

      setStats({
        totalItems: items.length,
        totalTags: allTags.size,
        avgTagsPerItem: items.length > 0 ? totalTags / items.length : 0,
      });
    };
    loadStats();
  }, []);

  return (
    <div className="py-4">
      <h2 className="mb-4">Statistics</h2>
      
      <Row>
        <Col md={4}>
          <Card className="stats-card">
            <h3>{stats.totalItems}</h3>
            <p className="mb-0">Total Media Items</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stats-card">
            <h3>{stats.totalTags}</h3>
            <p className="mb-0">Unique Tags</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stats-card">
            <h3>{stats.avgTagsPerItem.toFixed(1)}</h3>
            <p className="mb-0">Avg Tags per Item</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};