
export const StyleBuilder = () => {

    return `

body {
  background-color: black;
  overflow-x: hidden;
  color-scheme: dark light;
  color: #D5CEA3;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  font-family: 'Libre Baskerville', Georgia, Palatino, Baskerville, Cambria, Cochin, Garamond, Times, "Times New Roman", serif;
  padding-top: 2em;
  padding-bottom: 2em;
  line-height: 1.5;
  font-weight: lighter;
  letter-spacing: .03em;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}


/* mobile */
@media only screen and (max-width: 1024px) {

  body {
    font-size: medium;
  }

}

/* desktop */
@media only screen and (min-width: 1024px) {

  body {
    font-size: larger;
  }

}


.output {
  width: 100vw;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  padding-bottom: 3em;
}


.input {
  color: #E5E5CB;
  background-color: #181A2ADD;
  text-align: center;
  border: none transparent;
  outline: none;
  font-size: x-large;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 400;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-radius: 1em;
  margin-top: 1px;
  padding: 1em;
}


.preview {
  height: 4em;
  justify-content: center;
  align-items: center;
  margin-left: 3em;
  margin-right: 3em;
  margin-bottom: 3vh;
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}


.preview-content {
    color: #e2e2e2;
    animation-name: fade-in;
    animation-duration: 0.5s;
    background-color: #181A2ABB;
    border-radius: 1em;
    padding: 0.5em;
}


@keyframes fade-in {
  0% { opacity: 0; }

  100% { opacity: 1; }
}


.center-text {
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
}


.drop-cap {
  margin-top: 0px;
  margin-bottom: 0.2em;
}


.drop-cap::first-letter {
  font-family: 'Great Vibes', cursive;
  font-size: 200%;
  line-height: 50%;
  margin-right: 3px;

  color: #BE975F;
  text-shadow: 2px 2px 5px #1a1a1a;
}


.command-line {
    background-color: #141414;
    color: #D5CEA3;
    border-width: 0px;
    outline: none;
    font-family: sans-serif;
    font-size: x-large;
    text-align: center;
}


.response {
  background-color: rgba(0, 0, 0, 0.85);
  max-width: 60ch;
  margin-top: 1em;
  width: 80vw;
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 0.4em;
  padding-bottom: 1.5em;
  border-radius: 0.5em;
  background: linear-gradient(1, #1A120B, #1A120B);
  box-shadow: 20px 20px 50px #3C2A21, 
            -30px -30px 60px #1A120B;
  opacity: 1;
  animation: fade 0.25s;
}


h1 {
  font-family: 'Poppins';
  font-size: xxx-large;
  text-align: center;
}

h2 {
  font-family: 'Poppins';
  font-size: xx-large;
  text-align: center;
}

h3 {
  font-family: 'Poppins';
  font-size: x-large;
  text-align: center;
}


h4 {
  font-family: 'Great Vibes', cursive;
  font-size: large;
  text-align: center;
}


kbd {
    font-family: monospace;
    color: #BE975F;
}


p {
  margin-top: 0px;
  margin-bottom: 0.2em;
  text-indent: 1.12em;
}


aside {
  font-family: "Signika Negative";
  background-color: #0d0d0d;
  border-radius: 0.25em;
  padding: 0.5em;
  padding-bottom: 0.3em;
}



    `;

}

