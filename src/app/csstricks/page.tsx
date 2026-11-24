// // app/contact/page.tsx
"use client";

import "./csstricks.css";

export default function CssTricks() {
  return (
    <>
      <div className="glow-button-wrapper">
        <button type="button" className="glow-on-hover">
          HOVER AND CLICK ME!
        </button>
      </div>

      <nav className="menu">
        <input
          type="checkbox"
          className="menu-open"
          name="menu-open"
          id="menu-open"
        />
        <label className="menu-open-button" htmlFor="menu-open">
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </label>

        <a href="#" className="menu-item red">
          {" "}
          <i className="fa fa-bath"></i>{" "}
        </a>
        <a href="#" className="menu-item orange">
          {" "}
          <i className="fa fa-shower"></i>{" "}
        </a>
        <a href="#" className="menu-item gold">
          {" "}
          <i className="fa fa-thermometer"></i>{" "}
        </a>
        <a href="#" className="menu-item green">
          {" "}
          <i className="fa fa-bed"></i>{" "}
        </a>
        <a href="#" className="menu-item blue">
          {" "}
          <i className="fa fa-birthday-cake"></i>{" "}
        </a>
        <a href="#" className="menu-item indigo">
          {" "}
          <i className="fa fa-bicycle"></i>{" "}
        </a>
      </nav>


   <button className="animatedButton">
    Book Now
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</button>

    </>
  );
}
