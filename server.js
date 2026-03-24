const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

projects = [
    {
      id: 1,
      name: "Africano",
      imgUrl: "africano-FI.png",
      description: "lorem ipsum",
      category: "Website",
      stack: "WordPress",
      skills: ["HTML5", "CSS3", "JS", "jQuery", "PHP"],
      state: "live",
      liveFlag: true,
      liveUrl: "https://africanosproperties.com/"
    },
    {
      id: 1,
      name: "Africano Pro 2",
      imgUrl: "placeholder.jpg",
      description: "lorem ipsum",
      category: "Other",
      stack: "WordPress",
      skills: ["html", "css", "js"],
      state: "live",
      liveFlag: false,
      liveUrl: "https://wwww.live.com"
    },
    {
      id: 1,
      name: "Africano Pro 3",
      imgUrl: "placeholder.jpg",
      description: "lorem ipsum",
      category: "Website",
      stack: "WordPress",
      skills: ["html", "css", "js"],
      state: "live",
      liveFlag: true,
      liveUrl: "https://wwww.live.com"
    },
    {
      id: 1,
      name: "Africano Pro 4",
      imgUrl: "placeholder.jpg",
      description: "lorem ipsum",
      category: "Project",
      stack: "WordPress",
      skills: ["html", "css", "js"],
      state: "live",
      liveFlag: false,
      liveUrl: "https://wwww.live.com"
    }

  ];


// home route
app.get('/', (req, res) => {
  res.json({ message: 'Projects API is running' });
});

// get all projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});



const PORT = process.env.PORT || 10000;

// Render requires binding publicly; web services must bind to host 0.0.0.0,
// and the default expected port is 10000 unless you configure another one.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});