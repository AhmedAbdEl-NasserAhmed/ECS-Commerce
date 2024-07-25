import { Box, Typography } from "@mui/material";
import { Fragment, useEffect, useRef } from "react";
import classes from "./BaseTimeline.module.scss";
import { FaCheck } from "react-icons/fa";

const BaseTimeline = ({
  activeStageIndex = 0,
  completedStagesIndexes = [],
  stages = [],
}) => {
  const checkupTimelineRef = useRef<HTMLElement>();

  const numberOfStages = stages.length - 1;

  const availableIndexesList =
    completedStagesIndexes.length >= numberOfStages
      ? numberOfStages
      : completedStagesIndexes.length;

  useEffect(() => {
    const setLabelPositionByLength = () => {
      if (checkupTimelineRef.current) {
        const labelList = Array.from(
          checkupTimelineRef.current.querySelectorAll("p")
        );
        labelList.forEach((label: HTMLParagraphElement) => {
          const currentLabelLength = label.textContent.length;
          if (currentLabelLength <= 10) {
            label.classList.add(classes["checkup-timeline__label--sm"]);
          }
        });
      }
    };
    setLabelPositionByLength();
  }, []);

  const timelineContentDynamic = stages.map((content, idx) => {
    return (
      <Fragment key={content.id}>
        <div className={`${classes["checkup-timeline__circle"]}`}>
          <span>{idx + 1}</span>
          <span className={`${classes["checkup-timeline__icon-done"]}`}>
            <FaCheck color="white" />
          </span>
        </div>
        <Typography className={classes["checkup-timeline__label"]}>
          {content.name}
        </Typography>
      </Fragment>
    );
  });

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className={`${classes["checkup-timeline"]} ${
          classes[
            `checkup-timeline--${stages.length > 5 ? "fluid" : undefined}`
          ]
        }`}
        ref={checkupTimelineRef}
      >
        <span className={classes["checkup-timeline__line"]}></span>
        <span
          className={`
            ${classes["checkup-timeline__line"]}
            ${classes["checkup-timeline__line--active"]}
          `}
          style={{
            zIndex: 2,
            width: `${(100 / numberOfStages) * availableIndexesList}%`,
          }}
        ></span>

        {timelineContentDynamic.map((content, idx) => {
          const isActiveStage = activeStageIndex === idx;
          const areDoneStages = completedStagesIndexes.includes(idx);
          return (
            <Box
              key={idx}
              className={`
                ${classes["checkup-timeline__wrapper"]}
                ${
                  isActiveStage
                    ? classes["checkup-timeline__wrapper--active"]
                    : ""
                }
                ${
                  areDoneStages
                    ? classes["checkup-timeline__wrapper--done"]
                    : ""
                }
                `}
            >
              {content}
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default BaseTimeline;
