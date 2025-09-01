from langchain_community.vectorstores import FAISS
from langchain_core.example_selectors import SemanticSimilarityExampleSelector
from langchain_openai import OpenAIEmbeddings
from Prompts.SqlQueryPropmpts import getSystemPrompt
from langchain_core.prompts import (
    ChatPromptTemplate,
    FewShotPromptTemplate,
    MessagesPlaceholder,
    PromptTemplate,
    SystemMessagePromptTemplate,
)

examples = [
    {
        "input": "Which are top 3 channels for enrollments?",
        "query": "SELECT Top 3  Channel, sum(Enrollments ) FROM InteractionSummary  GROUP BY channel Order by SUM(Enrollments) Desc;",
    },
    {
        "input": "What are the top performing campaigns in 'CarrierX', 'Digital' and 'Real Time Lead' channels? ",
        "query": "select TOP 3 Channel, CampaignPocName, SUM(Enrollments) from InteractionSummary where  Channel in ('CarrierX', 'Digital', 'Real Time Lead') GROUP BY Channel, CampaignPocName Order by SUM(Enrollments) Desc;",
    },
    {
        "input": "What are the top 3 states for conversion rate with high call volume? ",
        "query": "SELECT TOP 3 State, SUM(Enrollments) as TotalEnrollments, COUNT(ContactId) as TotalCalls, (SUM(Enrollments) * 1.0 / COUNT(ContactId)) as ConversionRate FROM InteractionSummary GROUP BY State HAVING COUNT(ContactId) > (SELECT AVG(Calls) FROM (SELECT COUNT(ContactId) as Calls FROM InteractionSummary GROUP BY State) as AvgCalls) ORDER BY ConversionRate DESC;",
    },
    {
        "input": "Which state has highest MA Mix?",
        "query": "SELECT TOP 1 State, SUM(MA)/NULLIF(SUM(Enrollments), 0) as MA_Mix FROM InteractionSummary GROUP BY State ORDER BY MA_Mix DESC;",
    },
    {
        "input": "What is the top performing partners in that state?",
        "query": "SELECT TOP 5 Partner, SUM(Enrollments) FROM InteractionSummary WHERE State = 'AL' GROUP BY Partner ORDER BY SUM(Enrollments) DESC;",
    },
    {
        "input": "What is the best time of day to generate leads?",
        "query": "SELECT TOP 5 HourGroup ,COUNT(ContactId) AS LeadCount FROM InteractionSummary GROUP BY HourGroup ORDER BY LeadCount DESC;",
    },
    {
        "input": "What are the top performing campaigns in these channels respectively?",
        "query": """SELECT TOP 1 Channel
                    ,CampaignPocName
                    ,SUM(Enrollments)
                FROM InteractionSummary
                WHERE Channel IN ('CarrierX')
                GROUP BY Channel
                    ,CampaignPocName

                UNION ALL
                SELECT TOP 1 Channel
                    ,CampaignPocName
                    ,SUM(Enrollments)
                FROM InteractionSummary
                WHERE Channel IN ('Digital')
                GROUP BY Channel
                    ,CampaignPocName



                UNION ALL

                SELECT TOP 1 Channel
                    ,CampaignPocName
                    ,SUM(Enrollments)
                FROM InteractionSummary
                WHERE Channel IN ('Real Time Lead')
                GROUP BY Channel
                    ,CampaignPocName
                ORDER BY SUM(Enrollments) DESC""",
    },
]


def getPromptWithFewShotExamples(dialect):
    example_selector = SemanticSimilarityExampleSelector.from_examples(
        examples,
        OpenAIEmbeddings(),
        FAISS,
        k=5,
        input_keys=["input"],
    )

    few_shot_prompt = FewShotPromptTemplate(
        example_selector=example_selector,
        example_prompt=PromptTemplate.from_template(
            "User input: {input}\nSQL query: {query}"
        ),
        input_variables=["input", "dialect", "top_k"],
        prefix=getSystemPrompt(dialect),
        suffix="",
    )
    full_prompt = ChatPromptTemplate.from_messages(
        [
            SystemMessagePromptTemplate(prompt=few_shot_prompt),
            ("human", "{input}"),
            MessagesPlaceholder("agent_scratchpad"),
        ]
    )

    return full_prompt
