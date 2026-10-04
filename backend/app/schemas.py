from pydantic import BaseModel, Field


class ActivityIn(BaseModel):
    id: str
    demand: float = Field(gt=0)
    prod_gpt: float = Field(ge=0)
    prod_kimi: float = Field(ge=0)
    cost_gpt: float = Field(ge=0)
    cost_kimi: float = Field(ge=0)


class OptimizeRequest(BaseModel):
    activities: list[ActivityIn] = Field(min_length=1, max_length=50)
    budget: float = Field(ge=0)
    capacity_gpt: float = Field(ge=0)
    capacity_kimi: float = Field(ge=0)
