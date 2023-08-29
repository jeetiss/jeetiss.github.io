import { getDay, addYears, differenceInCalendarWeeks } from "date-fns";
// import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as styles from "./styles.css";

const Maze = ({ done }) => {
  return <div className={done ? styles.maze.done : styles.maze.default}></div>;
};

const defaultExpectedLifeDuration = 70;
const defaultBirthday = new Date("apr 14 1992");

export const BathTile = ({
  expectedLifeDuration = defaultExpectedLifeDuration,
  birthday = defaultBirthday,
}) => {
  const weekStartsOn = getDay(birthday);
  const weeks = differenceInCalendarWeeks(
    addYears(birthday, expectedLifeDuration),
    birthday,
    { weekStartsOn }
  );

  const complete = differenceInCalendarWeeks(new Date(), birthday, {
    weekStartsOn,
  });

  return (
    <div className={styles.container}>
      {weeks}/{complete}, {getDay(birthday)}
      <div className={styles.block}>
        {Array.from({ length: weeks }).map((_, i) => (
          <Maze key={i} done={i < complete} />
        ))}
      </div>
    </div>
  );
};
