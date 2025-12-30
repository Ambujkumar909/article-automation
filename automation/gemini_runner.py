import sys
import json
import os

# ✅ Force UTF-8 output (Windows safe)
sys.stdout.reconfigure(encoding="utf-8", line_buffering=True)

print("Gemini runner started", flush=True)

# ✅ NEW SDK (not deprecated)
from google import genai

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

try:
    raw_input = sys.stdin.read()
    print("Received stdin", flush=True)

    payload = json.loads(raw_input)

    original = payload.get("original", "")
    references = payload.get("references", "")

    prompt = f"""
Rewrite the article using the references to improve quality, structure, and clarity.
Also generate a 1-sentence summary.

Return STRICT JSON only.

FORMAT:
{{
  "summary": "...",
  "updated_content": "..."
}}

Original Article:
{original}

Reference Material:
{references}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        )

    text = response.text.strip()

    # 🔒 Extract JSON safely
    start = text.find("{")
    end = text.rfind("}") + 1
    clean_json = text[start:end]

    print(clean_json, flush=True)

except Exception as e:
    print(json.dumps({
        "summary": "",
        "updated_content": "",
        "error": str(e)
    }), flush=True)
