# RoboNav-3D

**Cinematic, scroll-controlled robot navigation website built with Streamlit and Python.**

## What makes this version different?

On the **Home** page, the robot follows your real page scrolling:
1. Starts on the **right**.
2. Glides toward the **left** as you scroll.
3. Moves to the **center** and performs a scroll-controlled **360° twirl**.
4. Continues to the simulator invitation.
5. Reverses naturally when you scroll upward.

The homepage is a **Streamlit Components v2** custom component, using three separate files:
- `home/story.html`: robot SVG (front and back), story text, section cards.
- `home/story.css`: dark futuristic layout, effects, sticky storytelling.
- `home/story.js`: scroll progress, movement waypoints and rotation.

This is a **3D-styled SVG/CSS robot**, not a physics-based Three.js model. Its scroll timing and 360° rotation match the approved prototype. The backend runs real pathfinding algorithms; the homepage is a visual presentation.

## Features

| Page | Content |
| --- | --- |
| **Home** | Full-width scrolling robot experience and animated storytelling |
| **Grid Simulator** | Obstacles, maps, real Python A* / Greedy algorithms, step-by-step playback and frontier table |
| **Algorithm Comparison** | Matched map for both algorithms and Matplotlib figures |
| **Experiment Lab** | Seeded 10×10 / 20×20 / 50×50 tests, density variation, non-optimality percentage, CSV, PNG and PDF |
| **Methodology** | Grid states, f(n), heuristics, experiment design |
| **About & Team** | Project and contributors |

Algorithms, Matplotlib plotting and experiment reporting are written in Python in the `backend/` directory. No machine-learning model, Kaggle dataset, database, external API or paid backend is needed.

## Run locally

Install **Python 3.12**. Open PowerShell in the repository root:

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m streamlit run streamlit_app.py
```

Visit `http://localhost:8501`. Scroll the Home page with your mouse. Use the sidebar to open the simulator, comparison and experiments.

## Deploy free on Streamlit Community Cloud

1. Open https://share.streamlit.io and choose **Create app → Deploy from GitHub**.
2. Repository: `Zahrah-Aqib/RoboNav-3D`
3. Branch: `main`
4. Main file path: `streamlit_app.py`
5. Python version: `3.12`.
6. Deploy and test the Home page, Grid Simulator, Experiment Lab and PDF export.

Do **not** use Render, Vercel or an extra Python API for this project.

## Verification

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s backend/tests -v
```

GitHub Actions also checks Python syntax, tests, and the scroll JavaScript.

**Deployment status:** source code is in GitHub; the live Streamlit Community Cloud deployment must be created and visually tested separately.

## Academic scope

- 2D static grid, up/down/left/right movement, unit edge cost.
- A* uses `f(n) = g(n) + h(n)`; Greedy Best-First uses `f(n) = h(n)`.
- Manhattan and Euclidean heuristics.
- Priority queue via `heapq`; true explored and frontier states.
- Matched-map comparisons, deterministic random seeds, measured execution times.
- U-shaped trap test: on the specific map, A* cost **15**, Greedy cost **39**.
- Four experiment metrics: path cost, expanded nodes, max frontier size, execution time.

This is a new project and does not replace the existing `RoboNav-Streamlit` or `Final-RoboNav-Website` repositories.
