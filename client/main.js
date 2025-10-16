// main.js
import './style.css'

// Get the root element from index.html
const app = document.getElementById('root')

// Simple test render (replace later with your actual app)
app.innerHTML = `
  <h1>PropsEdge Crystal is live!</h1>
  <p>Your frontend is now connected and ready for build.</p>
`
fetch(`${import.meta.env.VITE_API_BASE_URL}/api/test`)
  .then(res => res.text())
  .then(msg => console.log("API says:", msg))
  .catch(err => console.error("API error:", err));
