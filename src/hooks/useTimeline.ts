import { useParams } from "next/navigation";
import { useCallback } from "react";
import { useEffect, useReducer } from "react";

const initialState = { activeStageIndex: 0, completedStagesIndexes: [] };

const reducerFn = (state = initialState, action) => {
  if (action.type === "NEXT") {
    let stageIndex = state.activeStageIndex;
    const completeStages = [...state.completedStagesIndexes].concat(stageIndex);
    state.activeStageIndex = stageIndex + 1;
    return {
      ...state,
      completedStagesIndexes: completeStages,
    };
  }

  if (action.type === "PREV") {
    const stageIndex = state.activeStageIndex - 1;
    state.completedStagesIndexes.pop();
    return {
      ...state,
      activeStageIndex: stageIndex,
    };
  }

  if (action.type === "RESET") {
    return { ...initialState };
  }

  return state;
};

const useTimeline = (stages) => {
  const [timelineData, dispatch] = useReducer(reducerFn, initialState);
  const location = useParams();

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [location]);

  const nextStageHandler = useCallback(() => {
    if (timelineData.activeStageIndex <= stages.length - 1)
      dispatch({ type: "NEXT" });
  }, [timelineData.activeStageIndex, stages]);

  const prevStageHandler = useCallback(() => {
    if (timelineData.activeStageIndex) dispatch({ type: "PREV" });
  }, [timelineData.activeStageIndex, stages]);

  return {
    timelineData,
    goNextStage: nextStageHandler,
    goPrevStage: prevStageHandler,
  };
};

export default useTimeline;
