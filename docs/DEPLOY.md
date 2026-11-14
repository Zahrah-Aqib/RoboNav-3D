# Deploy RoboNav-3D

## Streamlit Community Cloud

Log in at https://share.streamlit.io using the same GitHub account.

Choose **Create app**, then **Deploy a public app from GitHub**. Enter:

- Repository: `Zahrah-Aqib/RoboNav-3D`
- Branch: `main`
- Main file: `streamlit_app.py`
- Python: `3.12`
- App URL: choose an available RoboNav-related name.

The root `requirements.txt` installs Streamlit (Components v2), NumPy, Pandas, Matplotlib and ReportLab.

No secrets or environment variables are required.

## First launch testing

1. Open Home and scroll through the entire story: right → left → center → twirl.
2. Click **Launch Simulator** and verify the navigation changes to the simulator.
3. Select the U-shaped trap: Manhattan A* should have path cost 15; Greedy cost 39.
4. Run experiments, inspect charts, download CSV and PDF.
5. Check mobile layout and scroll motion.
6. If deployment fails, open **Manage app → Logs** in Streamlit Cloud and copy the traceback.

## Local development

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m streamlit run streamlit_app.py
```

Source code uses `backend/` to share the lab-tested algorithms with the other RoboNav version.
