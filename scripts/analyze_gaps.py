import os
import re

def get_covered_days():
    covered_days = set()
    history_dir = 'content/history'
    
    # Regex to find day references like "Day 123", "Days 10-15", "Day 1-5"
    day_pattern = re.compile(r'Day(?:s)?\s+(\d+)(?:\s*-\s*(\d+))?', re.IGNORECASE)
    
    files = [f for f in os.listdir(history_dir) if f.endswith('.md')]
    
    for filename in files:
        # Check filename
        match = day_pattern.search(filename.replace('_', ' '))
        if match:
            start = int(match.group(1))
            end = int(match.group(2)) if match.group(2) else start
            for d in range(start, end + 1):
                covered_days.add(d)
        
        # Check content (first 500 chars usually contain the header/metadata)
        try:
            with open(os.path.join(history_dir, filename), 'r', encoding='utf-8') as f:
                content = f.read()
                # Search specifically for headers or metadata
                matches = day_pattern.findall(content)
                for m in matches:
                    start = int(m[0])
                    end = int(m[1]) if m[1] else start
                    # Limit range to reasonable village history (1-321) to avoid false positives
                    if start > 0 and end <= 321:
                        for d in range(start, end + 1):
                            covered_days.add(d)
        except Exception as e:
            print(f"Error reading {filename}: {e}")

    return covered_days

def main():
    covered = get_covered_days()
    all_days = set(range(1, 322))
    missing = sorted(list(all_days - covered))
    
    print(f"Total days covered: {len(covered)}")
    print(f"Total days missing: {len(missing)}")
    
    if missing:
        print("\nMissing Days:")
        # Group consecutive days
        ranges = []
        if not missing:
            return
        
        start = missing[0]
        prev = missing[0]
        
        for d in missing[1:]:
            if d == prev + 1:
                prev = d
            else:
                ranges.append((start, prev))
                start = d
                prev = d
        ranges.append((start, prev))
        
        for r in ranges:
            if r[0] == r[1]:
                print(f"Day {r[0]}")
            else:
                print(f"Days {r[0]}-{r[1]}")

if __name__ == "__main__":
    main()
