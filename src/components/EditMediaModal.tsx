import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MediaItem, updateMediaItem } from '../services/storage';

interface EditMediaModalProps {
  show: boolean;
  media: MediaItem;
  onHide: () => void;
  onUpdated: () => void;
}

const mediaSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  thumbnailUrl: Yup.string().url('Must be a valid URL'),
  tags: Yup.string(),
});

export const EditMediaModal: React.FC<EditMediaModalProps> = ({ show, media, onHide, onUpdated }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Media Item</Modal.Title>
      </Modal.Header>
      
      <Formik
        initialValues={{
          title: media.title,
          description: media.description || '',
          thumbnailUrl: media.thumbnailUrl || '',
          tags: media.tags.join(', '),
        }}
        validationSchema={mediaSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const tags = values.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

          await updateMediaItem(media.id, {
            title: values.title,
            description: values.description,
            thumbnailUrl: values.thumbnailUrl,
            tags,
          });

          setSubmitting(false);
          onUpdated();
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
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};