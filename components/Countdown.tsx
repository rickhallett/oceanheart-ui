"use client";

import React, { useState, useEffect } from "react";

const Countdown: React.FC = () => {
  // Set the target date to Friday, February 28 at 05:00 GMT.
  // (Adjust the year if necessary.)
  const targetDate = new Date("2025-02-28T05:00:00Z");

  const [timeRemaining, setTimeRemaining] = useState<number>(
    targetDate.getTime() - new Date().getTime()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(targetDate.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  if (timeRemaining <= 0) {
    return (
      <div className="text-center text-white font-bold py-2">
        The countdown has ended!
      </div>
    );
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <div className="text-center text-white font-bold py-2">
      {days}d {hours}h {minutes}m  remaining until Friday, February 28 at 05:00 GMT
    </div>
  );
};

export default Countdown;

// import Countdown, { zeroPad } from "react-countdown";

// // Set the target date to Friday, February 28 at 05:00 GMT                                             
// const targetDate = new Date("2025-02-28T05:00:00Z");

// const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
//   if (completed) {
//     return <div className="text-center text-white font-bold py-2">The countdown has ended!</div>;
//   } else {
//     return (
//       <div className="text-center text-white text-3xl font-bold py-2 glow">
//         {days} days {zeroPad(hours)} hours {zeroPad(minutes)} minutes {zeroPad(seconds)} seconds
//       </div>
//     );
//   }
// };

// const CountdownComponent: React.FC = () => {
//   return <Countdown date={targetDate} renderer={renderer} />;
// };

// export default CountdownComponent;
