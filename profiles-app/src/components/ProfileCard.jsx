import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ProfileCard({ name, likes, onLike, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [error, setError] = useState('');

  const handleSave = () => {
    const trimmed = newName.trim();
    if (!trimmed) {
      setError('Name cannot be empty');
      return;
    }
    setError('');
    onEdit(trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewName(name); // revert to old value
    setError('');
    setIsEditing(false);
  };

  return (
    <Card className="mb-3 shadow-sm text-center">
      <Card.Body>
        {isEditing ? (
          <>
            <Form.Control
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              isInvalid={!!error}
              className="mb-2"
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
            <div>
              <Button variant="success" size="sm" onClick={handleSave}>
                💾 Save
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="ms-2"
                onClick={handleCancel}
              >
                ✖ Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <Card.Title className="h5 mb-1">{name}</Card.Title>
            <Card.Text className="mb-2">Likes: {likes}</Card.Text>

            <Button variant="primary" onClick={onLike}>
              👍 Like
            </Button>
            <Button
              variant="warning"
              className="ms-2"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit
            </Button>
            <Button
              variant="danger"
              className="ms-2"
              onClick={onDelete}
            >
              🗑 Delete
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
