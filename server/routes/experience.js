const express = require('express');
const router = express.Router();
const experience = require('../data/data.json');


router.get('/', (req, res) => {
  const q = (req.query.search || '').trim().toLowerCase();

  if (!q) {
    return res.json(experience);
  }

  const filtered = experience.filter(e => {
    const check = `${e.title} ${e.description} ${e.tags.join(' ')} ${e.location}`.toLowerCase();
    return check.includes(q);
  });

  res.json(filtered);
});

//generate time & date
function generateAvailability() {
  const today = new Date();
  const dates = [];
  for (let i = 1; i <= 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i * 2);
    dates.push({
      date: d.toISOString().split('T')[0],
      slots: Math.floor(Math.random() * 8) + 2
    });
  }
  return dates;
}

//getById
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exp = experience.find(e => e.id === id);
  if (!exp) return res.status(404).json({ message: 'Not found' });

  res.json({ ...exp, availability: generateAvailability() });
});

module.exports = router;
