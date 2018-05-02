import React from 'react';

export const ToTop = () => {
  const toTop = () => {
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const scrollVelocity = height * (1 / 60);
    const interval = setInterval(
      () => {
        document.body.scrollTop -= scrollVelocity;
        document.documentElement.scrollTop -= scrollVelocity;
        if (window.pageYOffset <= 0) {
          clearInterval(interval);
        }
      });
  };

  return (
    <div className="toTop" onClick={toTop}>&#8593;</div>
  );
};
