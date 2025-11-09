import json
import re
from pathlib import Path
from typing import List, Dict, Optional

def clean_html(html: str) -> str:
    """Removes HTML tags and cleans up excessive whitespace, mimicking Cheerio's .text()."""
    if not html:
        return ''
    # Remove HTML tags using a simple regex (Note: For complex HTML, a full parser like BeautifulSoup is recommended)
    clean = re.sub('<[^>]*>', '', html)
    # Replace multiple whitespaces (including newlines) with a single space
    return re.sub(r'\s\s+', ' ', clean).strip()

def get_all_faq_files(dir_path: Path) -> List[Path]:
    """Recursively finds all .json files in a directory."""
    # rglob performs a recursive glob search for '*.json'
    return list(dir_path.rglob('*.json'))

def load_faq_data() -> Optional[str]:
    """Loads, processes, and combines all FAQ Q&A pairs into a single context string for RAG."""
    faq_data: List[Dict[str, str]] = []
    # Assumes the 'data' directory is a sibling of this script's location within the faq_api folder
    base_faq_data_dir = Path(__file__).parent / 'data'
    
    if not base_faq_data_dir.is_dir():
        print(f"FATAL: FAQ data directory not found at {base_faq_data_dir}. Ensure 'data' folder exists.")
        return None

    try:
        all_file_paths = get_all_faq_files(base_faq_data_dir)
        print(f"Found {len(all_file_paths)} JSON files.")

        for file_path in all_file_paths:
            file_content = file_path.read_text(encoding='utf-8')
            json_data = json.loads(file_content)

            # Extract Question (last history entry in 'result')
            question_history = json_data.get('result', {}).get('history', [])
            question_content = clean_html(question_history[-1].get('content')) if question_history else None

            # Extract Answer (first history entry in the 'i_answer' child)
            professor_answer_entry = next(
                (child for child in json_data.get('result', {}).get('children', []) if child.get('type') == 'i_answer'),
                None
            )
            answer_content = clean_html(professor_answer_entry['history'][0].get('content')) if professor_answer_entry and professor_answer_entry.get('history') else None

            if question_content and answer_content:
                # Clean up the "Καλησπέρα," prefix from the answer
                clean_answer = answer_content
                if clean_answer.lower().startswith('καλησπέρα,'):
                    clean_answer = clean_answer[len('καλησπέρα,'):].strip()

                faq_data.append({
                    'question': question_content,
                    'answer': clean_answer
                })
        
        if not faq_data:
            print("Warning: No FAQ data pairs were successfully loaded.")
            return None

        # Format context string
        context_string = "\n---\n".join([
            f"Ερώτηση: {item['question']}\nΑπάντηση: {item['answer']}"
            for item in faq_data
        ])

        print(f"Loaded and processed {len(faq_data)} Q&A pairs.")
        return context_string

    except Exception as error:
        print(f"FATAL: Could not load FAQ data. Error: {error}")
        return None