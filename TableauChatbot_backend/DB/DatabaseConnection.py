import os
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits import create_sql_agent
from langchain_openai import ChatOpenAI
from Prompts.FewShotPrompts import getPromptWithFewShotExamples
from DB.CallBacks import SQLHandler
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory

### Statefully manage chat history ###
store = {}

os.environ["OPENAI_API_KEY"] = "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"


class SQLQuery(object):
    def __init__(self, dashboardId=1):
        db = SQLDatabase.from_uri(
            "mssql+pyodbc://@"
            + "DESKTOP-VRMNLFD"
            + "/"
            + "MedicareSales"
            + "?trusted_connection=yes&driver=ODBC+Driver+17+for+SQL+Server"
        )
        llm = ChatOpenAI(model="gpt-4", temperature=0)
        self.sqlAgent = create_sql_agent(
            llm,
            db=db,
            agent_type="openai-tools",
            verbose=True,
            prompt=getPromptWithFewShotExamples(db.dialect),
        )
        self.handler = SQLHandler()

        # self.config = {
        #     "callbacks": [self.handler],
        # }

    def ask(self, query, history):
        res = self.sqlAgent.invoke(
            {"input": self.getQueryWithHistory(query, history)},
            {"callbacks": [self.handler]},
        )["output"]
        # res = self.chain_with_history.invoke(
        #     {"input": self.getQueryWithHistory(query, history)}, config=self.config
        # )
        print("------> Query", query, "Output", res)
        print("------> SQL", self.handler.sql_result)

        return {
            "data_points": "Na",
            "answer": res,
            "thoughts": f"Searched for:<br><br><br>Prompt:<br>",
        }

    def getDbNameFromDashboardId(self, dashboardId):

        if dashboardId == "1":
            return "MedicareSales2"
        if dashboardId == "2":
            return "LeadGenerationDB"

        return "MedicareSales2"

    def get_session_history(self, session_id: str):
        if session_id not in store:
            store[session_id] = ChatMessageHistory()
        return store[session_id]

    def getQueryWithHistory(self, query, history):

        return f"Based on following history of chat between you and user Where AIMessage is you response, answer {query}. Conversation so far is: {history}"
