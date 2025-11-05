import { useState } from 'react';
import { profiles } from './data/profiles.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProfileCard from './components/ProfileCard.jsx';

export default function App() {
  const [people, setPeople] = useState(profiles);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // ✅ Like button handler
  const handleLike = (id) => {
    setPeople((ps) =>
      ps.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  // ✅ Add new profile handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError('Name is required');
      return;
    }

    const exists = people.some(
      (p) => p.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      setError('Name must be unique');
      return;
    }

    const newProfile = {
      id: people.length + 1,
      name: trimmed,
      likes: 0,
    };

    setPeople([...people, newProfile]);
    setName('');
    setError('');
  };

  const handleDelete = (id) => {
    setPeople(ps => ps.filter(p => p.id !== id));
  };

  const handleEdit = (id, newName) => {
    setPeople(ps =>
      ps.map(p =>
        p.id === id ? { ...p, name: newName.trim() } : p
      )
    );
  };


  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

      {/* ✅ Add New Profile Form */}
      <Form className="mb-4" onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs={8} md={6} lg={4}>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Col>
          <Col xs="auto">
            <Button variant="success" type="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>

      {/* ✅ Profile Cards */}
      <Row xs={1} md={2} lg={3}>
        {people.map((p) => (
          <Col key={p.id}>
            <ProfileCard
              name={p.name}
              likes={p.likes}
              onLike={() => handleLike(p.id)}
              onDelete={() => handleDelete(p.id)}
              onEdit={(newName) => handleEdit(p.id, newName)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
