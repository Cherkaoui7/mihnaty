const AI_JSON_SCHEMA = `
{
  "profile": {
    "firstName": "string | null",
    "lastName": "string | null",
    "email": "string | null",
    "phone": "string | null",
    "city": "string | null",
    "country": "string | null",
    "educationLevel": "string | null",
    "primaryDomain": "string | null",
    "secondaryDomains": ["string"],
    "targetRole": "string | null",
    "experienceYears": "number | null",
    "about": "string | null"
  },
  "skills": [
    {
      "name": "string",
      "category": "string",
      "level": "number (0-100)",
      "evidence": "string"
    }
  ],
  "skillsToDevelop": [
    {
      "name": "string",
      "priority": "high|medium|low",
      "reason": "string"
    }
  ],
  "compatibleRoles": [
    {
      "title": "string",
      "domain": "string",
      "matchScore": "number (0-100)",
      "matchingSkills": ["string"],
      "missingSkills": ["string"]
    }
  ],
  "recommendations": {
    "courses": [
      { "title": "string", "url": "string", "focus": "string" }
    ],
    "nextSteps": ["string"]
  },
  "summary": "string"
}
`;
