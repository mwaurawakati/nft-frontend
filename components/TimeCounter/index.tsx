import Timer from "react-compound-timer";
import cn from "classnames";
import styles from "./TimeCounter.module.sass";

type TimeCounterProps = {
    className?: string;
    classTimerItem?: string;
    classTimerValue?: string;
    classTimerText?: string;
    time: any;
    abbreviated?: boolean;
    timeLeft?:any,
};

const TimeCounter = ({
    className,
    classTimerItem,
    classTimerValue,
    classTimerText,
    time,
    abbreviated,
    timeLeft
}: TimeCounterProps) => (
    <div className={cn(styles.timer, className)}>
        <Timer
            initialTime={time * 60 * 60000}
            direction="backward"
            formatValue={(value) =>
                `${value < 10 ? `0${value}` : value} units `
            }
        >
            {() => (
                <>
                    <div className={cn(styles.item, classTimerItem)}>
                        <span
                            className={cn("h3", styles.value, classTimerValue)}
                        >
                           {timeLeft?.days || 0}
                        </span>
                        <span className={cn(styles.text, classTimerText)}>
                            {abbreviated ? (
                                "h"
                            ) : (
                                <>
                                    <span>Days</span>
                                    <span>days</span>
                                </>
                            )}
                        </span>
                    </div>
                    <div className={cn(styles.item, classTimerItem)}>
                        <span
                            className={cn("h3", styles.value, classTimerValue)}
                        >
                          {timeLeft?.hours || 0}
                        </span>
                        <span className={cn(styles.text, classTimerText)}>
                            {abbreviated ? (
                                "m"
                            ) : (
                                <>
                                    <span>hours</span>
                                    <span>hrs</span>
                                </>
                            )}
                        </span>
                    </div>
                    <div className={cn(styles.item, classTimerItem)}>
                        <span
                            className={cn("h3", styles.value, classTimerValue)}
                        >
                          {timeLeft?.minutes || 0}
                        </span>
                        <span className={cn(styles.text, classTimerText)}>
                            {abbreviated ? (
                                "s"
                            ) : (
                                <>
                                    <span>minutes</span>
                                    <span>mins</span>
                                </>
                            )}
                        </span>
                    </div>
                </>
            )}
        </Timer>
    </div>
);

export default TimeCounter;
