export default `

html, body {
  height: 100%; 
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}


.container {
  margin: 0 auto 2em auto;
  max-width: 800px;
}



html {
  font-family: serif;
  font-size: 137.5%;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: 'Merriweather', serif;
  margin: auto;
  color: #333;
  padding: 0 1rem;
}

/* Copy & Lists */
p {
  line-height: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  padding: 0 1.5em;
}

ul,
ol {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

ul li,
ol li {
  line-height: 1.5rem;
}

ul ul,
ol ul,
ul ol,
ol ol {
  margin-top: 0;
  margin-bottom: 0;
}

blockquote {
  line-height: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-left: 0;
  padding-left: 1.5rem;
  border-left: 10px solid #333;
}

blockquote p, li p {
  padding: 0;
}

/* Headings */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: sans-serif;
  line-height: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  padding-bottom: 0.5em;
  border-bottom: 10px solid #333;
}

h1 {
  margin-top: 3rem;
  margin-bottom: 1rem;
}

hr {
  border: 5px solid #333;
  margin: 1.5rem 0;
}

/* Tables */
table {
  margin-top: 1.5rem;
  border-spacing: 0px;
  border-collapse: collapse;
  width: 100%;
}
table td,
table th {
  padding: 0.2rem 0.4rem;
  line-height: 1rem;
  font-family: sans;
}

table th {
  text-align: left;
  border-bottom: 3px solid #333;
}

/* Code blocks */
code {
  vertical-align: bottom;
}
pre {
  width: 100%;
  overflow-x: auto;
  background-color: #333;
  color: white;
  padding: 1rem;
}

figure {
  margin: 0;
}

figure img {
  display: block;
  margin: 0 auto;
}


figcaption {
  font-style: italic;
  font-size: 0.8rem;
  text-align: center;
}

img {
  max-width: 100%;
}

a {
  color: #333;
  font-weight: bold;
}

h1 a, h2 a, h3 a, h4 a, h5 a, h6 a {
  text-decoration: none;
}

a:hover {
  color: grey;
}

div {
  max-width: 100%;
}
`;
