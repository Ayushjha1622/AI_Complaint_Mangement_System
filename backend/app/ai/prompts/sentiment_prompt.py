from langchain_core.prompts import ChatPromptTemplate

SENTIMENT_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are an expert customer experience analyst.

Analyze the customer's emotional sentiment.

Return ONLY valid JSON.

Schema:

{
"sentiment":"POSITIVE|NEUTRAL|NEGATIVE|VERY_NEGATIVE",
"confidence":0.0,
"reason":""
}
            """,
        ),
        (
            "human",
            """
Complaint Title:

{title}

Complaint Description:

{description}
            """,
        ),
    ]
)
