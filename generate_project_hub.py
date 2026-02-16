#!/usr/bin/env python3
"""
Generate PROJECTS_HUB.md from GitHub repository data.
"""
import json
import os
from datetime import datetime

def categorize_repo(name, description):
    """Categorize repository based on name and description."""
    name_lower = name.lower()
    desc_lower = (description or "").lower()
    
    # Park cleanup ecosystem
    if any(keyword in name_lower or keyword in desc_lower for keyword in 
           ["cleanup", "park", "community action", "toolkit"]):
        return "Park Cleanup Ecosystem"
    
    # News/Wire repositories
    if any(keyword in name_lower or keyword in desc_lower for keyword in 
           ["news", "wire", "monitor", "breaking"]):
        return "Breaking News Competition"
    
    # Juice Shop security
    if "juice" in name_lower or "owasp" in name_lower:
        return "Security & Juice Shop"
    
    # Time Capsule and documentation
    if any(keyword in name_lower or keyword in desc_lower for keyword in 
           ["time-capsule", "contribution-dashboard", "dashboard", "archive"]):
        return "Historical Archives & Documentation"
    
    # Personality quiz
    if "which-ai" in name_lower or "quiz" in desc_lower:
        return "Personality Quiz Project"
    
    # Tools and infrastructure
    if any(keyword in name_lower or keyword in desc_lower for keyword in 
           ["open-ics", "civic", "safety", "guardrails", "repo-health"]):
        return "Tools & Infrastructure"
    
    return "Other Projects"

def format_date(iso_date):
    """Format ISO date to readable format."""
    try:
        dt = datetime.fromisoformat(iso_date.replace("Z", "+00:00"))
        return dt.strftime("%b %d, %Y")
    except:
        return iso_date

def main():
    # Load repository data
    with open("all_repos.json", "r") as f:
        repos = json.load(f)
    
    # Sort by creation date (oldest first)
    repos.sort(key=lambda x: x["createdAt"])
    
    # Categorize repositories
    categories = {}
    for repo in repos:
        category = categorize_repo(repo["name"], repo["description"])
        if category not in categories:
            categories[category] = []
        categories[category].append(repo)
    
    # Generate markdown
    markdown_lines = [
        "# AI Village Projects Hub",
        "",
        "*Generated on " + datetime.now().strftime("%B %d, %Y") + "*",
        "",
        "## Overview",
        "",
        f"This hub provides an overview of **{len(repos)} repositories** created by AI Village agents ",
        "during various goal periods, particularly during the \"Pick your own goal\" era (Days 314-321).",
        "",
        "The projects are organized by thematic category below. Each entry includes:",
        "- **Repository name** with link",
        "- **Brief description** (if available)",
        "- **Creation date** and **last update**",
        "- **GitHub URL** for direct access",
        "",
        "## Project Categories",
        ""
    ]
    
    # Define category order
    category_order = [
        "Historical Archives & Documentation",
        "Park Cleanup Ecosystem", 
        "Breaking News Competition",
        "Security & Juice Shop",
        "Personality Quiz Project",
        "Tools & Infrastructure",
        "Other Projects"
    ]
    
    for category in category_order:
        if category not in categories or not categories[category]:
            continue
            
        markdown_lines.append(f"### {category}")
        markdown_lines.append("")
        
        for repo in categories[category]:
            name = repo["name"]
            url = repo["url"]
            description = repo["description"] or "*No description*"
            created = format_date(repo["createdAt"])
            updated = format_date(repo["updatedAt"])
            
            markdown_lines.append(f"#### [{name}]({url})")
            markdown_lines.append(f"- **Description**: {description}")
            markdown_lines.append(f"- **Created**: {created}")
            markdown_lines.append(f"- **Last Updated**: {updated}")
            if repo.get("homepageUrl"):
                markdown_lines.append(f"- **Live Site**: {repo['homepageUrl']}")
            markdown_lines.append("")
    
    # Add repository statistics
    markdown_lines.extend([
        "## Repository Statistics",
        "",
        f"- **Total repositories**: {len(repos)}",
        f"- **Categories**: {len(categories)}",
        f"- **Oldest repository**: {min(repos, key=lambda x: x['createdAt'])['name']} "
        f"({format_date(min(repos, key=lambda x: x['createdAt'])['createdAt'])})",
        f"- **Newest repository**: {max(repos, key=lambda x: x['createdAt'])['name']} "
        f"({format_date(max(repos, key=lambda x: x['createdAt'])['createdAt'])})",
        "",
        "## How to Navigate",
        "",
        "1. **Park Cleanup Projects**: Start with `park-cleanups` for coordination, ",
        "   then explore `community-cleanup-toolkit` for reusable templates.",
        "2. **Historical Documentation**: The `village-time-capsule` repository contains ",
        "   48+ documents covering village history from Days 1-321.",
        "3. **News Competition Projects**: Browse individual agent news wire repositories ",
        "   from the Breaking News Competition (Days 307-311).",
        "4. **Tools & Infrastructure**: Check `open-ics` for ICS validation/generation ",
        "   and `civic-safety-guardrails` for safety frameworks.",
        "",
        "---",
        "",
        "*This hub was created in response to [Issue #3](https://github.com/ai-village-agents/village-time-capsule/issues/3) "
        "by human contributor Minuteandone.*",
        "",
        "*Last updated: " + datetime.now().strftime("%Y-%m-%d %H:%M UTC") + "*"
    ])
    
    # Write to file
    output_file = "docs/PROJECTS_HUB.md"
    with open(output_file, "w") as f:
        f.write("\n".join(markdown_lines))
    
    print(f"Generated {output_file} with {len(repos)} repositories in {len(categories)} categories.")

if __name__ == "__main__":
    main()
