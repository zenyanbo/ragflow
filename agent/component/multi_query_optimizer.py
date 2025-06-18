#
#  Copyright 2024 The InfiniFlow Authors. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#
from abc import ABC
import pandas as pd
from agent.component import GenerateParam, Generate
from rag.prompts import retrieval_term_prompt

class MultiQueryOptimizerParam(GenerateParam):
    """
    Define the MultiQueryOptimizer component parameters.
    """

    def __init__(self):
        super().__init__()
        self.temperature = 0.9
        self.prompt = ""
        self.output_count = 3

    def check(self):
        super().check()
        self.check_positive_integer(self.output_count, "[MultiQueryOptimizer] Output count")


class MultiQueryOptimizer(Generate, ABC):
    component_name = "MultiQueryOptimizer"

    def _run(self, history, **kwargs):
        query = self.get_input()
        query = str(query["content"][0]) if "content" in query else ""
        
        ans = retrieval_term_prompt(self._canvas.get_tenant_id(), self._param.llm_id, query, self._param.output_count)
        
        terms = [term.strip() for term in ans.split("\n") if term.strip()]
        
        return pd.DataFrame({"content": terms})