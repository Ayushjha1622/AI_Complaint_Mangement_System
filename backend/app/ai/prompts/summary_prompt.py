from langchain_core.prompts import ChatPromptTemplate

SUMMARY_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are an expert complaint analyst.

Analyze the complaint.

Return ONLY valid JSON.

Schema:

{{
"summary":"",
"main_issue":"",
"customer_concern":"",
"recommended_focus":"",
"severity":"LOW|MEDIUM|HIGH|CRITICAL"
}}
            """,
        ),
        (
            "human",
            """
Title:
{title}

Description:
{description}

Category:
{category}

Priority:
{priority}

Status:
{status}
            """,
        ),
    ]
)
