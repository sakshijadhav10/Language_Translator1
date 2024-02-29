import React, { useEffect } from "react";
import countries from "./data";

// import { CopyToClipboard } from "react-copy-to-clipboard";
const Translate = () => {
  useEffect(() => {
    const fromText = document.querySelector(".from-text");
    const toText = document.querySelector(".to-text");
    const selectTag = document.querySelectorAll("select");
    const icons = document.querySelectorAll(".row-from .row-to i");
    const translateBtn = document.querySelector("button");

    selectTag.forEach((tag, id) => {
      console.log(id);
      for (let country_code in countries) {
        let selected =
          id == 0
            ? country_code == "en-IN"
              ? "selected"
              : ""
            : country_code == "hi-IN"
            ? "selected"
            : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;

        tag.insertAdjacentHTML("beforeend", option);
      }
    });

    translateBtn.addEventListener("click", () => {
      let text = fromText.value.trim();
      let translateFrom = selectTag[0].value;
      let translateTo = selectTag[1].value;
      if (!text) return;
      toText.setAttribute("placeholder", "Translating...");
      let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

      fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
          toText.value = data.responseData.translatedText;
        });
    });
  }, []);

  return (
    <div>
      <center>
        <h1>Language Translator</h1>
        <div className="container">
          <div className="wrapper">
            <div className="text-input">
              <textarea
                rows="35"
                cols="50"
                spellCheck="false"
                className="from-text"
                id="fromtext"
                placeholder="Enter text"
              ></textarea>
              <textarea
                rows="35"
                cols="50"
                readOnly
                spellCheck="false"
                className="to-text"
                placeholder="Translation"
              ></textarea>
            </div>
            <ul className="controls">
              <li className="row-from">
                <div className="icons">
                  <i id="from" className="bx bxs-volume-full"></i>
                </div>
                <select></select>
              </li>

              <li className="row-to">
                <select></select>
                <div className="icons">
                  <i id="to" className="bx bxs-volume-full"></i>
                </div>
              </li>
            </ul>
            <div>
              <button className="buttons">Translate Text</button>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Translate;
