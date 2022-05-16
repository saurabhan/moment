import React, { useEffect, useState } from "react";
const Content = () => {
  const user = localStorage.getItem("user");
  const [focus, setFocus] = useState(localStorage.getItem("focus"));
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  const updateTime = async () => {
    setTime(
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  };

  useEffect(() => {
    updateTime();
    setInterval(() => {
      updateTime();
    }, 3600);
  }, []);

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      setFocus(e.target.value);
      localStorage.setItem("focus", e.target.value);
    }
  };

  return (
    <div>
      {focus ? (
        <>
          <h1 className="text-[12rem] -mt-10 font-bold text-white">{time}</h1>

          <div className="flex gap-2 justify-center items-center">
            <h1 className="text-4xl text-medium">
              Hello{" "}
              <span className="capitalize underline underline-offset-1">
                {user}
              </span>
            </h1>
          </div>

          <div className="pt-5">
            <h1 className=" opacity-75 text-lg text-center ">TODAY</h1>
            <p className="text-2xl">{focus}</p>
            <button className="pt-5 " onClick={() => setFocus("")}>
              change focus
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-white text-2xl text-center ">
            What is your main focus today?
          </h2>
          <input
            onKeyDown={keyPress}
            type="text"
            className="w-1/3 h-20 border-b-2 bg-transparent outline-none text-5xl text-center text-white"
          />
        </>
      )}
    </div>
  );
};

export default Content;
