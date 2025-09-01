from langchain_core.callbacks import BaseCallbackHandler
import json


class SQLHandler(BaseCallbackHandler):
    def __init__(self):
        print("Callback started")
        self.sql_result = None

    def on_agent_action(self, action, **kwargs):
        """Run on agent action. if the tool being used is sql_db_query,
        it means we're submitting the sql and we can
        record it as the final sql"""

        if action.tool == "sql_db_query":
            # print("Action", action)
            self.sql_result = action.tool_input

    def on_llm_start(self, serialized, prompts, **kwargs):
        formatted_prompts = "\n".join(prompts)
        # print(f"\n\n------Prompt------\n{formatted_prompts}\n------\n\n")
