import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addMediaItem } from '../services/storage';

interface AddMediaModalProps {
  show: boolean;
  onHide: () => void;
  onAdded: () => void;
}

const mediaSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  thumbnailUrl: Yup.string().url('Must be a valid URL'),
  tags: Yup.string(),
});

export const AddMediaModal: React.FC<AddMediaModalProps> = ({ show, onHide, onAdded }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Media Item</Modal.Title>
      </Modal.Header>
      
      <Formik
        initialValues={{
          title: '',
          description: '',
          thumbnailUrl: '',
          tags: '',
        }}
        validationSchema={mediaSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const tags = values.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

          await addMediaItem({
            title: values.title,
            description: values.description,
            thumbnailUrl: values.thumbnailUrl,
            tags,
          });

          setSubmitting(false);
          onAdded();
          onHide();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.title && !!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Thumbnail URL</Form.Label>
                <Form.Control
                  type="text"
                  name="thumbnailUrl"
                  value={values.thumbnailUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.thumbnailUrl && !!errors.thumbnailUrl}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.thumbnailUrl}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Tags (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="tags"
                  value={values.tags}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g., video, favorite, 2024"
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Add Media
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};